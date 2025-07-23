---
title: "Meshes to Matrices"
date: 2021-01-21T10:00:00+00:00
draft: false
tags: ["numerical methods", "openfoam"]
categories: ["mathematics", "CFD"]
---

This article goes through some basic facets of the lduMatrix class in OpenFOAM.

Discretization – the division of the domain into discrete parts in order to generate a system of equations that we can solve for a solution. In the Finite Volume Method, this is often represented by a system of equations that connects each cell (P) to its neighbours (N) and accounts for any source terms.

$$A_{p} \boldsymbol\psi_{p} = \sum_n A_{n} \boldsymbol \psi_{n} + \mathbf{S}_p$$,
where $\psi$ is the quantity to be solved for. The equation above created a matrix of the form:

$$\mathbf{AU = B}$$

The matrix A is formed by the coefficients of $\psi$ . The number of mesh cells is the rank of the matrix A. How is the matrix populated – that depends on the selection of the numerical schemes in the problem – which end up choosing how many neighbours each cell takes into account. But in general, A is a sparse matrix.

In OpenFOAM, this $AU = B$ system of equations is invoked by:
```cpp
solve(UEqn == -fvc::grad(p));
```
where the system of equations is actually:

$$M\mathbf{U} = -\nabla p$$
The aim of the discretization scheme from a performance perspective is to keep the matrix banded, or as close to diagonal as possible. This means, concentrate the sparse entries of the matrix around the diagonal. This requires the mesh cells to be numbered smartly, or the entries in the matrix will end up all around, making it sparse, but not diagonal.

This is an example of a sparse matrix with a random renumbering applied to an unstructured mesh – most of the entries in the matrix are 0, but they’re still spread everywhere – causing severe performance degradation for the linear solvers having to solve them.


Let’s look at how this numbering happens for simple structured meshes in OpenFOAM. A 2-D mesh in OpenFOAM is numbered with the so-called ‘onion’ method. Each new index is assigned to a cell that is the neighbour of a cell with the current lowest index. Consider the simple structured mesh with 9 cells in the figure below:

Let’s say the first cell is on the lower bottom edge – Cell 0. The next cell is assigned next to the current lowest index (which is 0). Hence Cell 1 is next to Cell 0. The current lowest cell index that still has free neighbours is still Cell 0. Hence, the next cell, Cell 2, is assigned next to Cell 0. Now the current lowest index is Cell 1, since Cell 0 has no more free spots for neighbours, Hence, Cell 3 is assigned to be next to Cell 1. Carry on this way and see why it’s called the onion method – you get to add and peel off layers!

The way a matrix is created from this is you cycle one by one through all the cells, creating a 9 by 9 matrix. Each cell finds itself once in the diagonal element of the matrix and that row is filled with the coefficients of all its neighbours. For example, Cell 0 would have its diagonal element on the first row (Row 0) of this matrix and the only entries in this row would be be Column 0, Column 1 and Column 2 – since these represent Cell 0 and its neighbours Cell 1 and Cell 2 respectively.


However – all neighbours aren’t “neighbours”. This is where the distinction is made between the colors blue and gray in the diagrams above. All the neighbour cells with cell indices lesser than the cell of interest are called owner cells, whereas all those with indices greater are called neighbour cells. In the matrix, this means all the lower triangle (gray) elements are owner cell coefficients, and all the upper triangle (light blue) elements are neighbour cell coefficients.

For example, the Cell 4 has Cell 1 and 2 as its owners, and Cell 6 and 7 as its neighbours. These are marked with the black dots to show which entries are populated. If you see the distribution of the black dots, you see that this leads to a diagonal matrix and bands around the diagonal – a banded matrix. A 16 element mesh would lead to the following matrix:

These banded, sparse, and diagonally dominant matrices are good candidates for linear, iterative solvers.

## The lduMatrix Class
If the upper triangle coefficients are a mirror image of the lower triangle ones, it is a symmetric matrix. For example, the Laplacian operator produces a symmetric matrix. If the upper and lower matrices are not the same, this is a skew symmetric matrix.

These matrix coefficients are stored in matrices of type `lduMatrix` (ldu = lower-diagonal-upper) The matrix type `fvMatrix` is a subclass of lduMatrix . The three arrays that `fvMatrix` stores are:

```cpp
scalarField *lowerPtr_;
scalarField *diagPtr_;
scalarField *upperPtr_;
```
If only the `diagPtr_` is defined, OpenFOAM reads this as a diagonal matrix. On the other hand, If only either one of `lowerPtr_` or `upperPtr_` are defined, OpenFOAM considers this a symmetrical matrix. I’ll cover how the face addressing connects to the cell addressing in another article. 

References:

[1] Uroić, Tessa. “Implicitly coupled finite volume algorithms.” PhD diss., University of Zagreb. Faculty of Mechanical Engineering and Naval Architecture., 2019.
