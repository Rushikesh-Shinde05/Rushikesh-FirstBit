//Q2.Accept three sides of a triangle from the user and determine whether the triangle is
//equilateral, isosceles, or scalene.
# include<stdio.h>
void main () {
	int  a = 90, b = 90, c = 90;
	if(a == b && b== c)
		printf("all three side of triangle is equilateral");
	else if (a == b || b == c || a == c)
		printf("all three side of triangle is isoceles");
	else if (a != b &&  b != c && a != c)
		printf("all three side of triangle is scalene");


}