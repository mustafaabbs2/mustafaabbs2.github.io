---
title: "CFL Criterion in Numerical Methods"
date: 2025-07-21T10:00:00+00:00
draft: false
tags: ["CFL", "numerical methods", "stability"]
categories: ["mathematics", "CFD"]
---

# CFL Criterion: Stability in Numerical Simulations

The Courant–Friedrichs–Lewy (CFL) criterion is a fundamental concept in numerical analysis, especially for solving partial differential equations (PDEs) in computational fluid dynamics (CFD).

## What is the CFL Criterion?

The CFL criterion provides a necessary condition for the stability of certain time-dependent numerical schemes. It relates the time step $\Delta t$, the spatial grid size $\Delta x$, and the wave speed $u$ in the system:

$$
\frac{u \Delta t}{\Delta x} \leq C
$$

where $C$ is the CFL number, typically $C \leq 1$ for explicit schemes.

## Why is it Important?

If the CFL condition is not satisfied, numerical solutions can become unstable and produce non-physical results. The criterion ensures that information does not travel more than one grid cell per time step.

## Example

Consider the 1D advection equation:

$$
\frac{\partial \phi}{\partial t} + u \frac{\partial \phi}{\partial x} = 0
$$

For a finite difference scheme, the CFL condition is:

$$
\Delta t \leq \frac{C \Delta x}{u}
$$

where $C$ is chosen based on the scheme (e.g., $C=1$ for upwind).

## Practical Implications

- **Explicit methods**: Strictly limited by CFL for stability.
- **Implicit methods**: Can be unconditionally stable, but accuracy may still depend on CFL.
- **CFD solvers**: Always check the CFL number when setting time steps!

## References
- Courant, R., Friedrichs, K., & Lewy, H. (1928). "Über die partiellen Differenzengleichungen der mathematischen Physik." Mathematische Annalen, 100(1), 32–74.
- [Wikipedia: CFL condition](https://en.wikipedia.org/wiki/Courant%E2%80%93Friedrichs%E2%80%93Lewy_condition)