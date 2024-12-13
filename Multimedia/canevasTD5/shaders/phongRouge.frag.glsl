#version 150 core

// couleur Ã©mise pour le pixel
in vec4 color;

out vec4 frag_color;

in vec3 lightDir;
in vec3 eyeVec;
in vec3 out_normal;



void main( void )
{
    vec3 L = normalize(lightDir);
    vec3 N = normalize(out_normal);

    float intensity = max(dot(L,N),0.0);

   

    vec3 E = normalize(eyeVec);
    vec3 R = reflect(-L, N);
    float specular = pow(max(dot(R, E), 0.0),2);

    vec4 final_color =vec4(0.2,0.0,0.0, 1.0);

    final_color +=0.6*intensity;
    frag_color = final_color;

}