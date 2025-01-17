#include <iostream>
#include <vector>
#include <array>
#include <fstream>
#include <string>

#if defined(__APPLE__)
#define GL_SILENCE_DEPRECATION
#include <OpenGL/gl3.h>
#include <GLUT/glut.h>

#else
#include <GL/glew.h>
#include <GL/glut.h>
#include <GL/freeglut.h>
#endif

#define concat(first, second) first second

#include "config.h"
#include "GLError.h"
#include "repere.h"

#define ENABLE_SHADERS

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

#include <sys/timeb.h>

repere rep(1.0);

unsigned int progid;
unsigned int mvpid;
unsigned int mid;
unsigned int vid;
unsigned int pid;

// Matrices 4x4 contenant les transformations.
glm::mat4 model;
glm::mat4 view;
glm::mat4 proj;

float angle = 0.0f;
float scale = 0.0f;
float inc = 0.1f;

unsigned int vaoids[1];

unsigned int nbtriangles;

float x, y, z;

std::array<float, 3> eye = {0.0f, 0.0f, 5.0f};

#define NBMESHES 4

struct shaderProg
{
    unsigned int progid; // ID du shader
    unsigned int mid;    // ID de la matrice de modelisation qui est passÃ©e en variable uniform au shader de vertex
    unsigned int vid;
    unsigned int pid;
    unsigned int LightID;
} shaders[NBMESHES];

struct maillage
{
    shaderProg shader;
    unsigned int vaoids;
    unsigned int nbtriangles;
    float angle = 0.0f;
    float scale = 0.0f;
    float inc = 0.1f;
    float x, y, z;
};

maillage maillages[NBMESHES];

float mouvementX = 0.0f;
float mouvementZ = 0.0f;

float sensitivity = 0.2f; // Sensibilité souris
float yaw = -90.0f;
float pitch = 0.0f;
bool firstMouse = true;

glm ::vec3 cameraPos = glm::vec3(0.0f, 0.0f, 5.0f);
glm::vec3 cameraFront = glm::vec3(0.0f, 0.0f, -1.0f);
glm::vec3 cameraUp = glm::vec3(0.0f, 1.0f, 0.0f);
glm::vec3 cameraRight = glm::vec3(1.0f, 0.0f, 0.0f);

void updateCameraMouse()
{
    // Recalcul des vecteurs avant et haut de la caméra à partir de l'angle de yaw et pitch
    glm::vec3 front;
    front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
    front.y = sin(glm::radians(pitch));
    front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
    cameraFront = glm::normalize(front);

    // Calcul des vecteurs Right et Up
    cameraRight = glm::normalize(glm::cross(cameraFront, glm::vec3(0.0f, 1.0f, 0.0f)));
    cameraUp = glm::normalize(glm::cross(cameraRight, cameraFront));
}

float lastX = 320.0f; // Position initiale de la souris (au centre de l'écran)
float lastY = 240.0f;

void deplacementSouris(int xpos, int ypos)
{
    static bool firstMouse = true;
    static float lastX = 400, lastY = 300;

    if (firstMouse)
    {
        lastX = xpos;
        lastY = ypos;
        firstMouse = false;
    }

    float xoffset = xpos - lastX;
    float yoffset = lastY - ypos;
    lastX = xpos;
    lastY = ypos;

    xoffset *= sensitivity;
    yoffset *= sensitivity;

    yaw += xoffset;
    pitch += yoffset;

    if (pitch > 89.0f)
        pitch = 89.0f;
    if (pitch < -89.0f)
        pitch = -89.0f;

    updateCameraMouse();
}

int getMilliCount()
{
    timeb tb;
    ftime(&tb);
    int nCount = tb.millitm + (tb.time & 0xfffff) * 1000;
    return nCount;
}

int getMilliSpan(int nTimeStart)
{
    int nSpan = getMilliCount() - nTimeStart;
    if (nSpan < 0)
        nSpan += 0x100000 * 1000;
    return nSpan;
}

int lastTime = 0;
double elapsed = double(getMilliSpan(lastTime)) / 1000.0;

void calcTime()
{

    if (lastTime != 0)
    {

        elapsed = double(getMilliSpan(lastTime)) / 1000.0;
        eye[0] += mouvementX * elapsed;
        eye[2] += mouvementZ * elapsed;
    }
    lastTime = getMilliCount();
}

void displayMesh(maillage mesh, glm::mat4 model)
{
    model = model * glm::scale(glm::mat4(1.0f), glm::vec3(mesh.scale, mesh.scale, mesh.scale));
    model = glm::rotate(model, angle, glm::vec3(1.0f, 1.0f, 1.0f));
    model = model * glm::translate(glm::mat4(1.0f), glm::vec3(-mesh.x, -mesh.y, -mesh.z));

    glUseProgram(mesh.shader.progid);

    glUniformMatrix4fv(mesh.shader.mid, 1, GL_FALSE, &model[0][0]);
    glUniformMatrix4fv(mesh.shader.vid, 1, GL_FALSE, &view[0][0]);
    glUniformMatrix4fv(mesh.shader.pid, 1, GL_FALSE, &proj[0][0]);

    glBindVertexArray(mesh.vaoids);
    glDrawElements(GL_TRIANGLES, mesh.nbtriangles * 3, GL_UNSIGNED_INT, 0);
    glBindVertexArray(0);
}

void display()
{
    calcTime();

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    // view = glm::lookAt( glm::vec3( eye[ 0 ], eye[ 1 ], eye[ 2 ] ),
    //   glm::vec3( eye[ 0 ], eye[ 1 ], eye[ 2 ]-1.0f ),
    //   glm::vec3( 0.0f, 1.0f, 0.0f ) );

    view = glm::lookAt(cameraPos, cameraPos + cameraFront, cameraUp);
    float decal = 1.25f;

    model = glm::mat4(1.0f);
    model = glm::translate(model, glm::vec3(-decal, -decal, 0.0f));
    displayMesh(maillages[0], model);

    model = glm::mat4(1.0f);
    model = glm::translate(model, glm::vec3(decal, decal, 0.0f));
    displayMesh(maillages[1], model);

    model = glm::mat4(1.0f);
    model = glm::translate(model, glm::vec3(-decal, decal, 0.0f));
    displayMesh(maillages[2], model);

    model = glm::mat4(1.0f);
    model = glm::translate(model, glm::vec3(decal, -decal, 0.0f));
    displayMesh(maillages[3], model);

    glutSwapBuffers();
}

void idle()
{
    calcTime();

    angle += 0.025f;
    if (angle >= 360.0f)
    {
        angle = 0.0f;
    }

    if (scale <= 0.0f)
    {
        inc = 0.1f;
    }
    else if (scale > 2.0f)
    {
        inc = -0.1f;
    }

    scale += inc;

    glutPostRedisplay();
}

void reshape(int w, int h)
{
    glViewport(0, 0, w, h);
    // Modification de la matrice de projection Ã  chaque redimensionnement de la fenÃªtre.
    proj = glm::perspective(45.0f, w / static_cast<float>(h), 0.1f, 100.0f);
}

void special(int key, int x, int y)
{
    switch (key)
    {
    case GLUT_KEY_UP: // Avancer
        cameraPos += 0.05f * cameraFront;
        break;
    case GLUT_KEY_DOWN: // Reculer
        cameraPos -= 0.05f * cameraFront;
        break;
    case GLUT_KEY_LEFT: // gauche
        cameraPos -= 0.05f * cameraRight;
        break;
    case GLUT_KEY_RIGHT: // droite
        cameraPos += 0.05f * cameraRight;
        break;
    case GLUT_KEY_CTRL_L:
        cameraPos -= 0.05f * cameraUp;
        break;
    }

    updateCameraMouse();
    glutPostRedisplay();
}

// La fonction pour gérer les touches normales
void key(unsigned char key, int x, int y)
{
    if (key == 27) // Esc
    {
        exit(0); // Ferme l'application
    }
}

maillage initVAOs(const shaderProg shader, const std::string &meshPath)
{
    unsigned int vboids[4];

    std::ifstream ifs(MY_SHADER_PATH + meshPath);

    std::string off;
    unsigned int nbpoints, tmp;
    ifs >> off;
    ifs >> nbpoints;
    ifs >> nbtriangles;
    ifs >> tmp;

    std::cout << nbtriangles;
    std::vector<float> vertices(nbpoints * 3);
    std::vector<float> colors(nbpoints * 3);
    std::vector<unsigned int> indices(nbtriangles * 3);
    std::vector<float> normals(nbpoints * 3);

    for (unsigned int i = 0; i < vertices.size(); ++i)
    {
        ifs >> vertices[i];
    }

    for (unsigned int i = 0; i < nbtriangles; ++i)
    {
        ifs >> tmp;
        ifs >> indices[i * 3];
        ifs >> indices[i * 3 + 1];
        ifs >> indices[i * 3 + 2];
    }

    // Calcul de la boÃ®te englobante du modÃ¨le
    float dx, dy, dz;
    float xmin, xmax, ymin, ymax, zmin, zmax;

    xmin = xmax = vertices[0];
    ymin = ymax = vertices[1];
    zmin = zmax = vertices[2];
    for (unsigned int i = 1; i < nbpoints; ++i)
    {
        if (xmin > vertices[i * 3])
            xmin = vertices[i * 3];
        if (xmax < vertices[i * 3])
            xmax = vertices[i * 3];
        if (ymin > vertices[i * 3 + 1])
            ymin = vertices[i * 3 + 1];
        if (ymax < vertices[i * 3 + 1])
            ymax = vertices[i * 3 + 1];
        if (zmin > vertices[i * 3 + 2])
            zmin = vertices[i * 3 + 2];
        if (zmax < vertices[i * 3 + 2])
            zmax = vertices[i * 3 + 2];
    }

    // Calcul du centre de la boÃ®te englobante
    x = (xmax + xmin) / 2.0f;
    y = (ymax + ymin) / 2.0f;
    z = (zmax + zmin) / 2.0f;

    // Calcul des dimensions de la boÃ®te englobante
    dx = xmax - xmin;
    dy = ymax - ymin;
    dz = zmax - zmin;

    // Calcul du coefficient de mise Ã  l'Ã©chelle
    scale = 1.0f / fmax(dx, fmax(dy, dz));
    std::cout << scale;

    // Calcul des normales.
    for (std::size_t i = 0; i < indices.size(); i += 3)
    {
        auto x0 = vertices[3 * indices[i]] - vertices[3 * indices[i + 1]];
        auto y0 = vertices[3 * indices[i] + 1] - vertices[3 * indices[i + 1] + 1];
        auto z0 = vertices[3 * indices[i] + 2] - vertices[3 * indices[i + 1] + 2];

        auto x1 = vertices[3 * indices[i]] - vertices[3 * indices[i + 2]];
        auto y1 = vertices[3 * indices[i] + 1] - vertices[3 * indices[i + 2] + 1];
        auto z1 = vertices[3 * indices[i] + 2] - vertices[3 * indices[i + 2] + 2];

        auto x01 = y0 * z1 - y1 * z0;
        auto y01 = z0 * x1 - z1 * x0;
        auto z01 = x0 * y1 - x1 * y0;

        auto norminv = 1.0f / std::sqrt(x01 * x01 + y01 * y01 + z01 * z01);
        x01 *= norminv;
        y01 *= norminv;
        z01 *= norminv;

        normals[3 * indices[i]] += x01;
        normals[3 * indices[i] + 1] += y01;
        normals[3 * indices[i] + 2] += z01;

        normals[3 * indices[i + 1]] += x01;
        normals[3 * indices[i + 1] + 1] += y01;
        normals[3 * indices[i + 1] + 2] += z01;

        normals[3 * indices[i + 2]] += x01;
        normals[3 * indices[i + 2] + 1] += y01;
        normals[3 * indices[i + 2] + 2] += z01;
    }

    for (std::size_t i = 0; i < normals.size(); i += 3)
    {
        auto &x = normals[i];
        auto &y = normals[i + 1];
        auto &z = normals[i + 2];

        auto norminv = 1.0f / std::sqrt(x * x + y * y + z * z);
        x *= norminv;
        y *= norminv;
        z *= norminv;
    }

    glGenVertexArrays(1, &vaoids[0]);
    glBindVertexArray(vaoids[0]);

    glGenBuffers(4, vboids);

    glBindBuffer(GL_ARRAY_BUFFER, vboids[0]);
    glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(float), vertices.data(), GL_STATIC_DRAW);

    auto pos = glGetAttribLocation(shader.progid, "in_pos");
    glVertexAttribPointer(pos, 3, GL_FLOAT, GL_FALSE, 0, 0);
    glEnableVertexAttribArray(pos);

    // VBO contenant les indices.
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, vboids[2]);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, indices.size() * sizeof(unsigned int), indices.data(), GL_STATIC_DRAW);

    // VBO contenant les normales.
    glBindBuffer(GL_ARRAY_BUFFER, vboids[3]);
    glBufferData(GL_ARRAY_BUFFER, normals.size() * sizeof(float), normals.data(), GL_STATIC_DRAW);

    auto normal = glGetAttribLocation(shader.progid, "in_normal");
    glVertexAttribPointer(normal, 3, GL_FLOAT, GL_TRUE, 0, 0);
    glEnableVertexAttribArray(normal);

    glBindVertexArray(0);

    // CrÃ©e et retourne la structure maillage
    maillage m;
    m.shader = shader;
    m.vaoids = vaoids[0];
    m.nbtriangles = nbtriangles;
    m.angle = 0.0f;
    m.scale = scale;
    m.x = x;
    m.y = y;
    m.z = z;
    m.inc = 0.1f;

    return m;
}

shaderProg initShaders(const std::string &pathVert, const std::string &pathFrag)
{
    unsigned int vsid, fsid;
    int status;
    int logsize;
    std::string log;

    std::ifstream vs_ifs(MY_SHADER_PATH + pathVert);
    std::ifstream fs_ifs(MY_SHADER_PATH + pathFrag);

    auto begin = vs_ifs.tellg();
    vs_ifs.seekg(0, std::ios::end);
    auto end = vs_ifs.tellg();
    vs_ifs.seekg(0, std::ios::beg);
    auto size = end - begin;

    std::string vs;
    vs.resize(size);
    vs_ifs.read(&vs[0], size);

    begin = fs_ifs.tellg();
    fs_ifs.seekg(0, std::ios::end);
    end = fs_ifs.tellg();
    fs_ifs.seekg(0, std::ios::beg);
    size = end - begin;

    std::string fs;
    fs.resize(size);
    fs_ifs.read(&fs[0], size);

    vsid = glCreateShader(GL_VERTEX_SHADER);
    const char *vs_char = vs.c_str();
    glShaderSource(vsid, 1, &vs_char, nullptr);
    glCompileShader(vsid);

    glGetShaderiv(vsid, GL_COMPILE_STATUS, &status);
    if (!status)
    {
        std::cerr << "Error: vertex shader compilation failed.\n";
        glGetShaderiv(vsid, GL_INFO_LOG_LENGTH, &logsize);
        log.resize(logsize);
        glGetShaderInfoLog(vsid, log.size(), &logsize, &log[0]);
        std::cerr << log << std::endl;
    }

    fsid = glCreateShader(GL_FRAGMENT_SHADER);
    const char *fs_char = fs.c_str();
    glShaderSource(fsid, 1, &fs_char, nullptr);
    glCompileShader(fsid);
    glGetShaderiv(fsid, GL_COMPILE_STATUS, &status);
    if (!status)
    {
        std::cerr << "Error: fragment shader compilation failed.\n";
        glGetShaderiv(fsid, GL_INFO_LOG_LENGTH, &logsize);
        log.resize(logsize);
        glGetShaderInfoLog(fsid, log.size(), &logsize, &log[0]);
        std::cerr << log << std::endl;
    }

    progid = glCreateProgram();
    glAttachShader(progid, vsid);
    glAttachShader(progid, fsid);
    glLinkProgram(progid);
    glUseProgram(progid);

    shaderProg shader;
    shader.progid = progid;
    shader.mid = glGetUniformLocation(progid, "m");
    shader.vid = glGetUniformLocation(progid, "v");
    shader.pid = glGetUniformLocation(progid, "p");

    return shader;
}

int main(int argc, char *argv[])
{
    glutInit(&argc, argv);
#if defined(__APPLE__) && defined(ENABLE_SHADERS)
    glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA | GLUT_3_2_CORE_PROFILE);
#else

    glutInitContextVersion(3, 2);
    glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
    glewInit();
#endif

    glutInitWindowSize(1000, 960);

    glutCreateWindow(argv[0]);

    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutIdleFunc(idle);
    glutSpecialFunc(special);
    glutKeyboardFunc(key);

    // Configurer la gestion des mouvements de la souris
    glutPassiveMotionFunc(deplacementSouris);
    glutSetCursor(GLUT_CURSOR_NONE); // Cache le curseur de la souris pour un contrôle libre

    // Initialisation de la bibliothÃ¨que GLEW.
#if not defined(__APPLE__)
    glewInit();
#endif

    glEnable(GL_DEPTH_TEST);
    shaders[0] = initShaders("/shaders/phong.vert.glsl", "/shaders/phong.frag.glsl");
    maillages[0] = initVAOs(shaders[0], "/meshes/space_shuttle2.off");
    shaders[1] = initShaders("/shaders/phong.vert.glsl", "/shaders/toon.frag.glsl");
    maillages[1] = initVAOs(shaders[1], "/meshes/space_station2.off");
    shaders[2] = initShaders("/shaders/phong.vert.glsl", "/shaders/phongVert.frag.glsl");
    maillages[2] = initVAOs(shaders[2], "/meshes/milleniumfalcon.off");
    shaders[3] = initShaders("/shaders/phong.vert.glsl", "/shaders/phongRouge.frag.glsl");
    maillages[3] = initVAOs(shaders[3], "/meshes/rabbit.off");
    rep.init();
    check_gl_error();

    glClearColor(0.0f, 0.0f, 0.0f, 0.0f);

    glutMainLoop();

    return 0;
}