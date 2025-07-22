---
title: "Underrelaxation in simpleFOAM"
date: 2020-06-27T10:00:00+00:00
draft: false
tags: ["numerical methods", "openfoam"]
categories: ["mathematics", "CFD"]
---

Consider a simple time derivative at a point P:

$$\frac{\mathbf{u}_P^{(n+1)} - \mathbf{u}_P^{(n)}}{\Delta t}$$

The momentum equation, which then is used to construct the coefficient matrix of u_p is discretized using neighbouring cell velocities as:

$$a_p u_p = \sum a_i u_i + S_{up} + S_u$$

The large time steps Δt in a SIMPLE algorithm effectively reduce the time derivative to very small values. The time derivative contributes very directly to the diagonal of a matrix, since the time derivative does not require any neighbouring points, atleast in the way the discretization is shown above. The time derivative is responsible for the **diagonal dominance** of the matrix, which contributes heavily to the stability of the solution. How does SIMPLE get around not having significant time derivative? — **underrelaxation**.

You might have heard of iteration schemes with “over-relaxation”. Underrelaxation in SIMPLE is an unrelated concept. It is a way to artificially amplify the diagonal coefficient a_p to achieve diagonal dominance.

The following term (with 1- α) is added to both sides of the discretization equation:

$$a_p u_p + \frac{1 - \alpha}{\alpha} a_p u_p = \sum a_i u_i + S_{up} + S_u + \frac{1 - \alpha}{\alpha} u_p^{(n-1)}$$

You may ask, is it really the same? For a converged solution, the terms **are** indeed the same, and they cancel out. Underrelaxation needs to take effect for a non-converged solution. Grouping the terms:

$$\frac{1}{\alpha} a_p u_p = \sum a_i u_i + S_{up} + S_u + \frac{1 - \alpha}{\alpha} u_p^{(n-1)}
$$

The diagonal coefficient is being effectively ampified via a 1/α multiplier, where α < 1

Lets check the relax function invoked in `UEqn.relax()`

```cpp
forAll(D, celli)
{
    D[celli] = max(mag(D[celli ]), sumOff[celli ]);
}

D /= alpha;
```

`D` is the diagonal matrix, or the `a_p` coefficient. Diagonal dominance is first checked when compared to the off-diagonal elements sumOff. The central coefficient is then multiplied by the 1/α multiplier.

This mechanism for stability allows SIMPLE to use the “t=1 second” timestep that we are familiar with. Underrelaxation is not applied to PISO algorithms (with Courant Number <1).

For reference, you set your underrelaxaton factors in fvSolutions

```cpp
relaxationFactors
{
    equations
    {
        U           0.9;    // 0.9 is more stable but 0.95 more convergent
        ".*"        0.9;    // 0.9 is more stable but 0.95 more convergent
    }
}

```

**References:**

1. Jasak, Hrvoje. “Error analysis and estimation for the finite volume method with applications to fluid flows.” (1996)

