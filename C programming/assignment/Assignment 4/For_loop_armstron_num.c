//Q1. Print armstrong numbers in the given range 1 to n.
#include<stdio.h>
void main () {
	int n = 153, sum = 0,digit,temp=n;
	for( ; n != 0;	n = n/10) {

		digit = n%10;
		sum = sum + digit*digit*digit;
	}

	if (sum == temp)
		printf("this number is armstrong number");
	else
		printf("this is not armstrong number");
}