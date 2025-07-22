---
title: "SIMPLEC — the “consistent” simpleFOAM control"
date: 2020-06-24T10:00:00+00:00
draft: false
tags: ["numerical methods", "openfoam"]
categories: ["mathematics", "CFD"]
---


The previous articles in this series took on debugging the simpleFoam solver through a VSCode debugger. SIMPLEC, a “consistent” implementation of the SIMPLE algorithm can be toggled on and off via the “consistent” switch in your `fvSolutions` file.

```cpp
SIMPLE
{
nNonOrthogonalCorrectors 2;
consistent yes;
}
```




The theory on SIMPLEC is a bit dense — so let’s go through it here.

When we derived our starting decomposed equation for SIMPLE:

$$AU = H(U) - \nabla p$$

Just as a reminder — A has the diagonal coefficients of velocity U, while H has the non-diagonal coefficients.

The SIMPLE algorithm works on velocity and pressure corrections in an iterative method. Quantities like U*, p* are the predicted value in the first iteration of a loop, and U`, p` are the correction quantities that are used to correct the predicted values.

$$U = U^* + U'$$
$$p = p^* + p'$$

A key assumption in the SIMPLE algorithm is that $$H(U`) = 0$$ which means that all the non diagonal coefficients of the correction velocity are 0. This correction velocity is obtained from the Poisson equation for pressure.

This means that the contributions to the correction velocity from all neighbouring cells are dropped.

For **SIMPLE**, the correction velocity equation is derived as:

$$ AU' = H(U') - \nabla p'$$
$$U' = \frac{\nabla p'}{A}$$


The pressure correction term can be large and needs to be under-relaxed with each step for this reason. So the algorithm then ends up doing a step like:

$$p = p^* + \alpha_p p'$$


where α is the under-relaxation factor. This means that the pressure correction step is happening much slower than technically possible. How do we get rid of this? By using a consistent formulation: **SIMPLEC**

SIMPLEC has the same basic formulation for correction velocity:
$$ AU' = H_1(U') - \nabla p' $$


Here, we are **not** going to ignore the neighbour velocities (the off-diagonal terms). Let’s rename $H(U`)$ as $H1(U`)$ to avoid confusion with $H(U*)$. 

$$AU' = H_1(U') - \nabla p'$$
$$U' = \frac{\nabla p'}{A_t}$$


Where $$A_t = A — H1$$ 

Deriving further

$$U^* = \frac{H(U^*)}{A} - \frac{\nabla p}{A}$$

$$U' = -\frac{\nabla p}{A_t}$$

$$U = \frac{H(U^*)}{A} - \frac{\nabla p}{A} - \frac{\nabla p'}{A_t}$$

$$= \frac{H(U^*)}{A} - \frac{\nabla p}{A} - \frac{\nabla p - \nabla p}{A_t}$$

$$= \frac{H(U^*)}{A} - \left(\frac{1}{A} - \frac{1}{A_t}\right) \nabla p - \frac{\nabla p}{A_t}$$



Compare this to the SIMPLE momentum corrector step to find U:

$$U = \frac{H(U^*)}{A} - \frac{\nabla p}{A}$$

You can see that the velocity is corrected by an equivalent of:

$$-\left( \frac{1}{A} - \frac{1}{A_t} \right) \nabla p^*
$$

How does this look like in OpenFOAM?

```cpp
if (simple.consistent())
{
    rAtU = 1.0/(1.0/rAU - UEqn.H1());
    phiHbyA +=
        fvc::interpolate(rAtU() - rAU)*fvc::snGrad(p)*mesh.magSf();
    HbyA -= (rAU - rAtU())*fvc::grad(p);
}

```

This is represented by the term `(rAU-rAtU())*fvc::grad(p)`. That’s the correction term for SIMPLEC! Observe the code to see if this matches with theory.

The velocity is then calculated by using the corrected HbyA. It’s that simple! There are no extra equations to be solved (like other SIMPLE variants like SIMPLER), and this may give you gains of 20–30% due to no under-relaxation being required. If you use this article to do a comparison between convergence in SIMPLE and SIMPLEC, do let me know how they fare against each other.
