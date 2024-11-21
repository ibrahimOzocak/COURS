#!/usr/bin/env python
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

dessin = svgwrite.Drawing('chatMultiple.svg', size=(800,600))


translate=(200,400)
for i in range(1,8):
    #carre_translation=[translater(prodMatVect(Matrotation(i*pi/12), prodMatVect(Matdilatation(0.7**i), sommet)), 
    #                              (translate[0]+50*i, translate[1])) for sommet in carre]
    pointsModif = [translater(prodMatVect(Matrotation(i*pi/12), prodMatVect(Matdilatation(0.8**i), sommet)), (translate[0]+85*i, translate[1])) for sommet in points]
    #dessin.add(dessin.polygon(carre_translation, fill='#FF0000',stroke="#000000", opacity=0.7))
    compose(pointsModif,triangles)
dessin.save()