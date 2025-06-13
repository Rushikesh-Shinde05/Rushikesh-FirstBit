//Q8.Check the given number is Strong number or not.
//Input: n = 145
//Output: Strong

#include<stdio.h>
void main () {
	int n =145,  temp, sum =0,digit;
	while(n != 0) {
		digit = n%10;;
		digit = sum;
		n  = n/10;
	}
	if (sum == temp)
	printf("strong number");
	else
		printf("not a strong number");
}