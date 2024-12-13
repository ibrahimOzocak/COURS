#version 150 core
// version du langage GLSL utilisée, ici 1.5

// mvp est la variable contenant la matrice proj*view*model
// uniform indique que c'est la même matrice pour tous les points
uniform mat4 mvp;

// in indique que la variable est fournie en entrée pour chaque point
// chaque point possède une position 3D
in vec3 in_pos;

out vec3 color;

void main(void)
{
  // Ajouter le vecteur (1.0, 0.0, 0.0) si x > 0
  vec3 modified_pos = in_pos;
  if (in_pos.x > 0.0) {
    modified_pos += vec3(1.0, 0.0, 0.0);
    color=vec3(1.0, 0.0, 0.0);
  }else if (in_pos.x<0){
    color = vec3( 0.0, 1.0, 0.0 );
  }else{
    color = vec3( 0.0, 0.0, 1.0 );
  }


  // Calculer la position du point avec les transformations appliquées
  gl_Position = mvp * vec4(modified_pos * 2, 1.0);
}
