---
title: "Managing Memory in OpenFOAM"
date: 2020-07-13T10:00:00+00:00
draft: false
tags: ["numerical methods", "openfoam"]
categories: ["mathematics", "CFD"]
---

These are some notes on the components of the memory management system in OpenFOAM. I would expect to find these building blocks in any code that involves large chunks of data that you cannot possibly keep copying back and forth. The two components that OpenFOAM uses are variations of smart pointers, autoPtr and tmp. If you’ve programmed in C++ before, the OpenFOAM autoPtrhas a closest counterpart in std::unique_ptr , whereas tmp would be a variation of std::shared_ptr . This article deals with tmp, I’ll use the next one in this series for autoPtr.

This is where you might see tmp , on the other hand. In simpleFoam.C:

```cpp
// simpleFoam.C

tmp<fvVectorMatrix> tUEqn
(
    fvm::div(phi, U)
    + MRF.DDt(U)
    + turbulence->divDevReff(U)
    ==
    fvOptions(U)
);
```

These smart pointers are available in the folder:
```bash
cd $FOAM_SRC/src/OpenFOAM/memory
```
There are subfolders for autoPtr, refCount, and tmp.

The tmp class behaves like a std::shared_ptr . Shared pointers keep track of how many pointers are pointing to a block in memory. This is done through some kind of reference counting. To this end, the tmp class inherits from another class, refCount:

```cpp
typedef Foam::refCount refCount;
```

If you use a std::shared_ptr to point to an object in memory, and if you copy the pointer once, there are now two pointers pointing to the same block of memory. If the original pointer goes out of scope, the reference count drops by one, but there is still one more pointer pointing to it, so the destructor for the object is not called just yet. This is an example of reference counting, which is laid out in refCount.H more explicitly.

tmp does it by incrementing the refCount variable as in when thetUEqn object is created. This is done via the operator++ from refCount.H.

```cpp
    template<class T>
    inline Foam::tmp<T>::tmp(const tmp<T>& t):
    ptr_(t.ptr_),
    type_(t.type_)

     {
         if (isTmp())
         {
            if (ptr_)
               {

                   operator++();
               }

    ...
```
When the pointer to tUEqn goes out of scope, it calls the destructor of tmp. The destructor does nothing but call the clear method in tmp

```cpp
    template<class T>
    inline void Foam::tmp<T>::clear() const noexcept
    {
    if (isTmp() && ptr_)
       {
         if (ptr_->unique())
           {
              delete ptr_;  //deletes the pointer if it points uniquely
            }

         else
            {
               ptr_->operator--(); // decrements the ref counter
             }

    ptr_ = nullptr;

        }
    }
```
The first real application comes when you see the following step in UEqn.H :

```cpp
// UEqn.H
fvVectorMatrix& UEqn = tUEqn.ref();
```

The tUEqn.ref() returns the pointer to tUEqn …
```cpp
    template<class T>

    inline T& Foam::tmp<T>::ref() const

    { ...

    return *ptr_; 

    }
```
…and makes UEqn point to it. The “=” assignment operator here is meant to **not make a copy**. Copying is expensive, especially if your fvVectorMatrix is going to be generated for millions of mesh points. From how I understand it, it just copies the pointer to the original RHS (tUEqn) and sets the original pointer to null. Check out the Foam::tmp<T>::operator= method in tmpI.H .

```cpp
    ptr_ = t.ptr_;

    type_ = PTR;

    t.ptr_ = nullptr;
```
The second advantage is allowing the reduction in peak memory by clearing out large amounts of data. We saw the destructor of tmp using the clear() method. This can also be used at specific points in the top level solver and gives great flexibility in dropping peak memory loads instantly. Go to the pEqn.H file in the simpleFoam directory:

```cpp
// pEqn.H
tUEqn.clear();
```

```cpp
while (simple.correctNonOrthogonal())
{
    fvScalarMatrix pEqn
    (
        fvm::laplacian(rAtU(), p) == fvc::div(phiHbyA)
    );
}
```

This allows the pointer to the momentum matrix to be deleted right before the pressure equation, where the peak in simpleFoam is reached. This is partly based on the answer by Hrove Jasak [here](https://www.cfd-online.com/Forums/openfoam-programming-development/71912-tmp-stands-true-macro-pain.html).

If you’re looking for more information on this, this [wiki](http://openfoamwiki.net/index.php/OpenFOAM_guide/tmp) covers a lot of stuff I haven’t.

References: [http://openfoamwiki.net/index.php/OpenFOAM_guide/tmp](http://openfoamwiki.net/index.php/OpenFOAM_guide/tmp)
