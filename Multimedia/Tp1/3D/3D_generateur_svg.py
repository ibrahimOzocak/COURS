#!/usr/bin/env python
import math
import svgwrite
from math import *

triangle=[(0,300),(400,300),(200,0)]
carre=[(100,100),(-100,100),(-100,-100),(100,-100)]

def translater(input, vectTrans):
  x,y=input
  tx,ty=vectTrans
  return ((x+tx, y+ty))

def rotation(point, angle):
    x, y = point
    out=(x*cos(angle)+y*(-sin(angle)),x*sin(angle)+y*cos(angle))
    return out

def prodMatVect(Mat, Vect ):
    x, y = Vect
    ( (a11,a12), (a21, a22) ) = Mat

    x2 = a11 * x + a12 * y
    y2 = a21 * x + a22 * y

    return (x2,y2)


def Matrotation(angle):
     return (((cos(angle), -sin(angle)),(sin(angle), cos(angle))))

angle = pi/12
matRot = Matrotation(pi/6)

def Matdilatation(coefDilatation):
  return ((coefDilatation,0), (0, coefDilatation))

aux=100
points=[(-100, 0), (-100, -70), (-50, 0), (0, -30), (50, 0), (100, -70), (100, 0), (0, 50)]
triangles=[0,1,2,2,3,4,4,5,6,0,6,7]

def compose(points,triangles):
  liste_point=[]
  colors=("blue","red","green","purple","yellow","white","coral","darkblue")
  for i in range(0,len(triangles)//3):
      print(triangles[3*i],triangles[3*i+1],triangles[3*i+2])
      dessin.add(dessin.polygon((points[triangles[3*i]],points[triangles[3*i+1]],points[triangles[3*i+2]]), fill=colors[(i%(len(colors)*2))//2],  opacity=0.5,stroke='black'))

def projection(point3d):
    return((point3d[0],point3d[1]))

def changer_point(point, direction):
    x, y, z = point
    dx, dy, dz = direction
    return (x + dx, y + dy, z + dz)

def prodMatVect3D(Mat, Vect ):
    x, y,z = Vect
    ( (a11,a12,a13), (a21, a22,a23), (a31, a32,a33) ) = Mat

    x2 = a11 * x + a12 * y+ a13 * z
    y2 = a21 * x + a22 * y+ a23 * z
    z2 = a31 * x + a32 * y+ a33 * z

    return (x2,y2,z2)

def prodMatMat3D(MatA, MatB ):

    ( (a11,a12,a13),
    (a21, a22,a23),
    (a31, a32,a33) )  = MatA

    ( (b11,b12,b13),
    (b21, b22,b23),
    (b31, b32,b33) )  = MatB

    return ( (a11*b11+a12* b21+a13*b31 , a11*b12+a12* b22+a13*b32,a11*b13+a12* b23+a13*b33  ),
     (  a21*b11+a22* b21+ a23*b31, a21*b12+a22* b22 +a23*b32,  a21*b13+a22* b23+a23*b33),
     (  a31*b11+a32* b21+ a33*b31, a31*b12+a32* b22 +a33*b32,  a31*b13+a32* b23+a33*b33))

def Matdilatation3D(coefDilatation):
         return ((coefDilatation,0,0),
                         (0,coefDilatation,0),
                         (0,0,coefDilatation))

def Matrotation3DY(angle):
    return (
          (math.cos(angle), 0, math.sin(angle)),
          (0, 1, 0),
          (-math.sin(angle), 0, math.cos(angle)))

def Matrotation3DX(angle):
    return (
          (1, 0, 0),
          (0, math.cos(angle), -math.sin(angle)),
          (0, math.sin(angle), math.cos(angle)))

def Matrotation3DZ(angle):
    return (
          (math.cos(angle), -math.sin(angle), 0),
          (math.sin(angle), math.cos(angle), 0),
          (0, 0, 1))

aux=100
points = [
    [-aux, -aux, aux],  # point 0 (face devant)
    [-aux, aux, aux],   # point 1 (face devant)
    [aux, aux, aux],    # point 2 (face devant)
    [aux, -aux, aux],   # point 3 (face devant)
    [-aux, -aux, -aux], # point 4 (face arrière)
    [-aux, aux, -aux],  # point 5 (face arrière)
    [aux, aux, -aux],   # point 6 (face arrière)
    [aux, -aux, -aux]   # point 7 (face arrière)
]

cube = [
    0, 1, 2,  # triangle 1 face 1 (devant)
    0, 2, 3,  # triangle 2 face 1
    4, 5, 6,  # triangle 1 face 2 (arrière)
    4, 6, 7,  # triangle 2 face 2
    0, 1, 5,  # triangle 1 face 3 (gauche)
    0, 5, 4,  # triangle 2 face 3
    2, 3, 7,  # triangle 1 face 4 (droite)
    2, 7, 6,  # triangle 2 face 4
    1, 2, 6,  # triangle 1 face 5 (haut)
    1, 6, 5,  # triangle 2 face 5
    0, 3, 7,  # triangle 1 face 6 (bas)
    0, 7, 4   # triangle 2 face 6
]

dessin = svgwrite.Drawing('Cube.svg', size=(800,600))

colors = ("blue", "red", "green", "purple", "yellow", "white", "coral", "darkblue")
for i in range(len(cube) // 3):
    p1 = points[cube[3 * i]]
    p2 = points[cube[3 * i + 1]]
    p3 = points[cube[3 * i + 2]]
    
    rotated_points = [prodMatVect3D(Matrotation3DY(math.pi / 6), sommet) for sommet in [p1, p2, p3]]
    rotated_points = [prodMatVect3D(Matrotation3DX(math.pi / 12), sommet) for sommet in rotated_points]
    rotated_points = [prodMatVect3D(Matrotation3DZ(math.pi / 12), sommet) for sommet in rotated_points]
    translated_points = [projection(prodMatVect3D(Matdilatation3D(0.5), changer_point(sommet, (200, 400, 0)))) for sommet in rotated_points]
    
    dessin.add(dessin.polygon(translated_points, fill=colors[(i%(len(colors)*2))//2], opacity=0.5, stroke='black'))

#compose(pointsModif,cube)

dessin.save()