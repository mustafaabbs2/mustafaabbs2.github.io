---
title: "simpleFoam explained"
date: 2020-06-24T10:00:00+00:00
draft: false
tags: ["numerical methods", "openfoam"]
categories: ["mathematics", "CFD"]
---

>Tip — This is not meant to be a standalone article. It’s much more useful walking along this like a tutorial and not just reading through . So I highly recommend catching up to the point of entry in this article with the previous one.

Let’s look at the actual implementation of simpleFoam in this article. We left off by preparing the solver with all the mesh, field, and time objects that it would need. 

> Before you move ahead, I recommend you see this really good [video](https://www.youtube.com/watch?v=OOILoJ1zuiw) (Aidan Wimshurst) on an introduction to the algorithm. (If you haven’t checked the whole series out, please do!)

In an incompressible simulation, you have more variables (u,v,w,p) than equations. The system cannot be solved directly because there is no explicit equation for pressure. That’s why you need an algorithm to do this. As a refresher, the N-S equation is shown in vector form below:

$$\rho \frac{D\mathbf{U}}{Dt} = -\nabla p + \nabla \cdot \boldsymbol{\tau} + \rho \mathbf{g}
$$

Let’s convert this into the simplest matrix system we can think of, considering the stress term is a function of velocities too:

$$M\mathbf{U} = -\nabla p$$

Here, M is just the coefficient matrix of the velocities. Now, what most algorithms do is convert this sparse matrix M into a diagonal and an off-diagonal matrix. The diagonal matrix is called A in OpenFOAM, while the off-diagonal one is called H. This will become clear in a bit once you see the source code. The decomposition is done as follows:

$$A\mathbf{U} - \mathbf{H} = -\nabla p$$

What the algorithm does is essentially the following.

- It solves directly for velocity U. This is called the momentum predictor step:

$$\mathbf{U} = \frac{\mathbf{H}}{A} - \frac{\nabla p}{A}
$$

Simple yes? Turns out however, this velocity was not giving a constraint of mass conservation. **This velocity satisfies the momentum equations but not the continuity equations.**

$$\nabla \cdot \mathbf{U} = 0
$$

- To satisfy this condition, the equation in (3) is inserted in the equation in (4). This yields a Poisonn equation for pressure — this is solved for pressure.

$$\nabla \cdot \left( \frac{\nabla p}{A} \right) = \nabla \cdot \left( \frac{\mathbf{H}}{A} \right)
$$

- The pressure correction is used to obtain the correct velocity that satisfies the continuity equation. But wait, this no longer satisfies the momentum equation now! This needs to be iterated in a loop until the solution converges.

Let’s observe how this is implemented. The two main solution components of the algorithm lie inside these two files:
```cpp
#include UEqn.H
#include pEqn.H
```
Let’s step into `UEqn.H:`

```cpp
    tmp<fvVectorMatrix> tUEqn
    (
    fvm::div(phi, U)
    + MRF.DDt(U)
    + turbulence->divDevReff(U)
    ==
    fvOptions(U)
    );
```

This creates a tUEqn object of type `fvVectorMatrix`. This is essentially the MU system discussed above. This includes contributions from Moving Reference Frame (MRF) and the stress tensor, both functions of velocity and hence part of the matrix.
```cpp
    solve(UEqn == -fvc::grad(p))
```
This is equivalent to the $$MU = -\nabla p$$ portion of the algorithm. Now, we have a `UEqn` object that contains the solution of this system of equations.

The diagonal matrix is extracted by `UEqn.A()` and the off-diagonal matrix by `UEqn.H()`. We see this when we enter `pEqn.H`:
```cpp
volScalarField rAU(1.0/UEqn.A());

volVectorField HbyA(constrainHbyA(rAU*UEqn.H(), U, p));

surfaceScalarField phiHbyA(“phiHbyA”, fvc::flux(HbyA));
```

`rAU` is simply 1/A,

`HbyA` is unsurprisingly, H/A

and `phiHbyA` is the `surfaceScalarField` equivalent of `HbyA`, which is originally a `volVectorField`.

The Poisson equation that needs to be solved is 

$$\boldsymbol{\nabla} \cdot \left( \frac{\boldsymbol{\nabla} p}{A} \right) = \boldsymbol{\nabla} \cdot \left( \frac{\mathbf{H}}{A} \right)$$


which calculates pressure. This is very direct translation into code:

```cpp

fvScalarMatrix pEqn

(
fvm::laplacian(rAtU(), p) == fvc::div(phiHbyA)
);

pEqn.solve();
```

The last step of the algorithm is fairly straightforward too. The new pressure values are used to correct the velocity so that it satisfies the continuity equation. This equation:

$$\mathbf{U} = \frac{\mathbf{H}}{A} - \frac{\boldsymbol{\nabla} p}{A}$$

```cpp

    U = HbyA — rAtU()*fvc::grad(p);

    U.correctBoundaryConditions();
```

That’s the end of one SIMPLE iteration. This will continue until convergence. There are a fair number of components this tutorial did not cover — mainly to avoid a tedious long read, relaxation factors, non-orthogonal correction etc to name a few. If this helped you gain some intuition into how essentially the most fundamental solver in OpenFOAM works, these could be covered in more advanced articles.
