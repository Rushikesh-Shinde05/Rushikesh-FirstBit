//Q3.Write a program to find greatest of three numbers using nested if-else

#include<stdio.h>
void main() {
	int a = 1, b = 2, c = 3;
	if(a > b && a>c)
		printf("a is grater then b");
	else if (b > a && b >c )
		printf(" a is grater then c");
	else if ( c >a && c >b)
		printf(" c is grater then b");


}