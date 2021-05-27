
/*
 * GLUT Shapes Demo
 *
 * Written by Nigel Stewart November 2003
 *
 * This program is test harness for the sphere, cone
 * and torus shapes in GLUT.
 *
 * Spinning wireframe and smooth shaded shapes are
 * displayed until the ESC or q key is pressed.  The
 * number of geometry stacks and slices can be adjusted
 * using the + and - keys.
 */


#include <stdio.h>
#include <stdlib.h>
#include<cstring>
#include <math.h>

#include <GL/glut.h>

const GLint screenWidth=500,screenHeight=500;
const GLfloat whiteAxis[4]={1.0,1.0,1.0,1.0};

const GLdouble angle=20,near=1.0,far=20;
GLfloat angleSun=0.0, angleEarthSun=0.0, angleEarthAxis=0.0, angleMoon=0.0, speedRotation=0.01, axisVisible=0.6;

//Dati parametri
const GLfloat light[4][4]={
	{25.0,25.0,0.0,1.0},	//light_position
	{1.0,1.0,1.0,1.0},		//light_diffuse
	{1.0,1.0,1.0,1.0},		//light_specular
	{0.1,0.1,0.1,0.1}};		//light_ambient

const GLfloat sun[3][4]={
	{1.0,1.0,0.0,1.0}, //sun_diffuse
	{0.1,0.1,0.1,1.0}, //sun_specular
	{0.1,0.1,0.1,1.0}}; //sun_ambient
const GLfloat sunShininess=10.0;	//sun_shininess

const GLfloat earth[3][4]={
	{0.0,0.0,1.0,1.0},
	{0.1,0.1,0.1,1.0},
	{0.1,0.1,0.1,1.0}};
const GLfloat earthShininess=10.0;

const GLfloat moon[3][4]={
	{0.2,0.2,0.2,1.0},
	{0.1,0.1,0.1,1.0},
	{0.1,0.1,0.1,1.0}};
const GLfloat moonShininess=5.0;

const GLfloat sunRadius=0.4;

void colorSphere(GLint mode){
	switch (mode)
	{
	case 0:
		{
			glMaterialfv(GL_FRONT,GL_DIFFUSE,whiteAxis);
			glMaterialfv(GL_FRONT,GL_SPECULAR,whiteAxis);
			glMaterialfv(GL_FRONT,GL_AMBIENT,whiteAxis);
		}
		break;
	case 1:
		{
				glMaterialfv(GL_FRONT,GL_DIFFUSE,sun[0]);
				glMaterialfv(GL_FRONT,GL_SPECULAR,sun[1]);
				glMaterialfv(GL_FRONT,GL_AMBIENT,sun[2]);
				glMaterialf(GL_FRONT,GL_SHININESS,sunShininess);
			}
		break;
	case 2:{
			glMaterialfv(GL_FRONT,GL_DIFFUSE,earth[0]);
			glMaterialfv(GL_FRONT,GL_SPECULAR,earth[1]);
			glMaterialfv(GL_FRONT,GL_AMBIENT,earth[2]);
			glMaterialf(GL_FRONT,GL_SHININESS,earthShininess);
			}
		break;
	case 3:
		{
			glMaterialfv(GL_FRONT,GL_DIFFUSE,moon[0]);
			glMaterialfv(GL_FRONT,GL_SPECULAR,moon[1]);
			glMaterialfv(GL_FRONT,GL_AMBIENT,moon[2]);
			glMaterialf(GL_FRONT,GL_SHININESS,moonShininess);
		}
	}
}

void init(){	
	glClearColor(0.0,0.0,0.0,0.0);
	glLineWidth(1.5);
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	gluLookAt(10.0,5.0,10.0,0.0,0.0,0.0,0.0,1.0,0.0);	
	glEnable(GL_DEPTH_TEST);

	glEnable(GL_LIGHTING); //Omogucavamo racunanje refleksije
	glEnable(GL_LIGHT0);	//Ukljucujemo prvi izvor
	glLightfv(GL_LIGHT0,GL_POSITION,light[0]);	//Dodjeljujemo poziciju izvoru
	glLightfv(GL_LIGHT0,GL_DIFFUSE,light[1]);	//dodjela difuzne komponente
	glLightfv(GL_LIGHT0,GL_SPECULAR,light[2]);	//dodjela reflektujuce komponente
	glLightfv(GL_LIGHT0,GL_AMBIENT,light[3]);	//dodjela amijentalne komponente
}

void reshape(int w,int h){    
	glViewport(0,0,w,h);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(angle,(GLfloat)h/(GLfloat)w,near,far); 
	glMatrixMode(GL_MODELVIEW); 
}

void display(){  
	glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);//radimo sa dva bafera boja!
	
	glPushMatrix();	//SUN
		glRotatef(angleSun,0.0,1.0,0.0);  //sunce se rotira oko svoje ose!
		angleSun=angleSun+speedRotation/4;
		colorSphere(1);
		glutSolidSphere(sunRadius,20,20);
	glPopMatrix();

	glPushMatrix();	//Ako zakomentiramo ovu i liniju ispred - rotira se i osa!
		colorSphere(0);
		glBegin(GL_LINES);
			glVertex2f(0.0,sunRadius/2+axisVisible);
			glVertex2f(0.0,-(sunRadius/2+axisVisible));
		glEnd();
	glPopMatrix();

	glPushMatrix();		//EARTH
		glRotatef(angleEarthSun,0.0,1.0,0.0); //Rotacija oko y ose globalnog sistema - ose sunca!
		angleEarthSun=angleEarthSun+speedRotation/3;

		glTranslatef(1.5,0.0,0.0);
		glRotatef(23.0,0.0,0.0,1.0);    //osa zemlje je pomjerena za 23step. u odnosu na y osu!

		glRotatef(angleEarthAxis,0.0,1.0,0.0); //Rotacija oko sve y ose (lokalna)
		angleEarthAxis=angleEarthAxis+speedRotation;

		colorSphere(2);
		glutSolidSphere(sunRadius/2,20,20);
	glPopMatrix();

	glPushMatrix();
		glRotatef(angleEarthSun,0.0,1.0,0.0); //Osa se rotira oko sunca, ali ne i oko same sebe!
		angleEarthSun=angleEarthSun+speedRotation;
	
		glTranslatef(1.5,0.0,0.0);
		glRotatef(23.0,0.0,0.0,1.0);

		colorSphere(0);
		glBegin(GL_LINES);
			glVertex2f(0.0,sunRadius/4+axisVisible/2);
			glVertex2f(0.0,-(sunRadius/4+axisVisible/2));
		glEnd();
	
		glRotatef(angleMoon,0.0,1.0,0.0);   //MOON1 - oko y
		angleMoon=angleMoon+speedRotation*2;
		colorSphere(3);
		glTranslatef(0.4,0.3,0.0);
		glutSolidSphere(sunRadius/4,20.0,20.0);

		glRotatef(angleMoon,1.0,0.0,0.0);  //MOON2  - oko x
		angleMoon=angleMoon+speedRotation*2;
		glTranslatef(0.0,-0.3,0.0);
		glutSolidSphere(sunRadius/4,20.0,20.0);
	glPopMatrix();

	glFlush();
	glutSwapBuffers();
	glutPostRedisplay();
}

int main(int argc,char** argv){
	glutInit(&argc,argv);
	glutInitDisplayMode(GLUT_DOUBLE|GLUT_RGB|GLUT_DEPTH);  
	glutInitWindowSize(screenWidth,screenHeight);
	glutCreateWindow("Dancing Spheres");
	glutDisplayFunc(display);
	glutReshapeFunc(reshape);
	init();
	glutMainLoop();
}