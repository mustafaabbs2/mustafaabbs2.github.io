---
title: "Algebraic Multigrid (AMG) Methods"
date: 2025-07-20T10:00:00+00:00
draft: false
tags: ["AMG", "multigrid", "linear solvers"]
categories: ["mathematics", "CFD"]
---

# Algebraic Multigrid (AMG) Methods

Algebraic Multigrid (AMG) is a powerful technique for solving large, sparse linear systems, especially those arising from the discretization of partial differential equations (PDEs) in computational science and engineering.

## What is AMG?

AMG is a multilevel method that accelerates the convergence of iterative solvers by operating on a hierarchy of grids or levels. Unlike geometric multigrid, AMG constructs these levels and the transfer operators (restriction and prolongation) directly from the matrix, without requiring geometric information about the underlying problem.

## Key Concepts

- **Coarse Grids:** AMG automatically generates coarse representations of the problem using only the matrix structure.
- **Smoothers:** Iterative methods (e.g., Gauss-Seidel, Jacobi) are used to reduce high-frequency errors on each level.
- **Interpolation/Restriction:** Operators are built algebraically to transfer information between fine and coarse levels.

## AMG Cycle

A typical AMG cycle consists of:

1. **Pre-smoothing:** Apply a few iterations of a smoother to the fine grid.
2. **Restriction:** Transfer the residual to a coarser grid.
3. **Coarse Grid Correction:** Solve or approximate the error equation on the coarse grid.
4. **Prolongation:** Interpolate the correction back to the fine grid.
5. **Post-smoothing:** Apply a few more iterations of the smoother.

## Mathematical Formulation

Given a linear system $A x = b$, AMG builds a hierarchy of matrices $A^l$ and uses transfer operators $P^l$ (prolongation) and $R^l$ (restriction) such that:

$$
A^{l+1} = R^l A^l P^l
$$

The coarse grid correction is computed as:

$$
x^l \leftarrow x^l + P^l e^{l+1}
$$

where $e^{l+1}$ is the error estimated on the coarse level.

## Applications

- Solving Poisson, diffusion, and elliptic PDEs
- Computational Fluid Dynamics (CFD)
- Structural mechanics

## References
- [A. Brandt, "Algebraic Multigrid Theory: The Symmetric Case," Appl. Math. Comput., 1986.](https://www.sciencedirect.com/science/article/pii/0096300386900472)
- [Wikipedia: Algebraic multigrid](https://en.wikipedia.org/wiki/Algebraic_multigrid)