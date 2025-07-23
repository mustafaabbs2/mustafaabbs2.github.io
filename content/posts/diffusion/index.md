---
title: "The Diffusion Term in OpenFOAM and Non-Orthogonality!"
date: 2021-02-17T10:00:00+00:00
draft: false
tags: ["numerical methods", "openfoam"]
categories: ["mathematics", "CFD"]
---

The example above is an example of an orthogonal arragement of cells. This means that the face normal is along the same direction as the direction of the vector connecting the centroids of the two cells. Life is good if we have these! This is why non-orthogonality is a major test criterion in mesh checks – let’s discover why in this post.

In contrast, the following arrangement shows cells that display non-orthogonality:


The face normal vector in the image above is at an angle to the horizontal – and ergo, the line connecting the two cell centroids. This is non-orthogonality.


The image above is an example of an arrangement of cells that is both skew and non-orthogonal. As is clear, the difference between the non-orthogonality and skewness is – when the two centroids are connected by a line that does not pass through the face center of the face, there is an offset between the face center and the point at which the connecting line bisects the face.

Skew meshes are equally problematic – and one way to deal with them (from the numerics point of view) is selecting a node based Green-Gauss scheme to calculate the gradient, for instance.

## Discretization of the Diffusion Term
We will be looking at non-orthogonality in this article and how it becomes relevant to tackle problems that arise from a non-orthogonal mesh. Let’s look at the N-S equations for incompressible flow:

$$
\frac{\partial \mathbf{\mathbf{U}}}{\partial t} +  \nabla \cdot \mathbf{\mathbf{U}  \mathbf{U}} = -\nabla p + \nabla \cdot (\nu \nabla \mathbf{U}) + \mathbf{g} 
$$

The diffusion term in the equation is $\nabla \cdot (\nu \nabla \mathbf{U})$ , where $\nu$ is the diffusion coefficient. Apply the divergence theorem (we want to go from a volume integral to a surface integral (which can then become a summation over faces, remember?) This is:

$$
 \int_V \, [\nabla \cdot (\nu \nabla \mathbf{U})] dV =  \int_S [\nu \, (\nabla \mathbf{U}).\mathbf{n}] dS.
$$

A surface integral as the sum over finite faces is:

$$
\int_S \, [\nu(\nabla \mathbf{U}).\mathbf{n}] = \sum_{f=1}^N\left[ \nu_f \, (\nabla \mathbf{U})_f \cdot \mathbf{n}_f  \right] S_f,
$$

where $S_f$ is the area of a face $f$ .

This calculation is done with the aid of laplacianSchemes. The laplacian term $$\nabla \cdot (\nu \nabla \mathbf{U})$$ is in reality converted to a gradient term with the help of the divergence theorem, as seen above. For the calculation of gradients, face values are required. In this case, the diffusion coefficient $\nu$ needs to be interpolated from the centroid to the face. Hence, when you supply a `laplacianSchemes` entry to `fvSchemes`, you accompany it with an interpolation scheme entry. This could be `linear`, `pointLinear`, or the others available in OpenFOAM.

```cpp
laplacianSchemes
{
default         none;
laplacian(gamma,phi) Gauss <interpolation scheme> <snGrad scheme>
}
```

## Tackling Non-Orthogonality
But what’s the snGrad entry? This is how we tackle the non-orthogonality problem raised early in this article.

$$ \sum_{f=1}^N\left[ \nu_f \, (\nabla \mathbf{U})_f \cdot \mathbf{n}_f \right]$$ is a dot product between the normal vector of a face and the gradient of velocity at the face. The gradient at a face is a relatively simple affair if the mesh is orthogonal – that is, the vector connecting the points P and N (in the image above, vector d) is along the same line as the unit normal vector $\mathbf{\hat{n}}_f$ . A simple 1-D discretization would be:

$$(\nabla \mathbf{U})_f \cdot \mathbf{\hat{n}}_f =  |{\mathbf{\hat{n}}_f}| \frac{\mathbf{U}_N - \mathbf{U}_P}{|{\mathbf{d}|}} .$$
      
But what if the mesh is non-orthogonal? Depending on the orthogonality of the cell, the gradient vector and the face normal vector are not always aligned!

Recall this slightly modified image of a non-orthogonal pair arrangement we saw earlier:


The dot product $$(\nabla \mathbf{U})_f \cdot \mathbf{\hat{n}}_f$$ is now difficult to evaluate. To resolve this, let’s zoom into Cell 2:


The unit normal vector is split into two – an orthogonal component \Delta and a non-orthogonal component k , where:

$$\mathbf{\hat{n}} = \Delta + \mathbf{k} $$
Let’s try substituting this in the discretization:


$$
= \sum_{f=1}^N \nu_f (\nabla U)_f \cdot n_f \, S_f
$$

$$
= \sum_{f=1}^N \nu_f (\nabla U)_f \cdot (\Delta + k) \, S_f
$$

$$
= \sum_{f=1}^N \nu_f \left( (\nabla U)_f \cdot \Delta \right) S_f  + $$

$$
\sum_{f=1}^N \nu_f \left( (\nabla U)_f \cdot k \right) S_f
$$

The left “orthogonal” part of this sum can be evaluated implicitly, while the “non-orthogonal” (correction) part must be evaluated explicitly. This is the over-relaxed approach explained in Prof. Jasak’s thesis.

The `snGradScheme` entry help in deciding how delta and k are calculated. For example, orthogonal is used when the mesh does not require any non-orthogonal correction. This will be listed in `fvSchemes` as:

```cpp
laplacianSchemes
{
    laplacian(gamma,phi) Gauss linear orthogonal
}

```

## References

Jasak, Hrvoje. “Error analysis and estimation for the finite volume method with applications to fluid flows.” (1996).

