//Q5.Check the given number is Armstrong number or not..
//Input: n = 153
//Output: Armstrong
#include<stdio.h>
void main () {
	int n = 153, temp = n, sum = 0,digit;
	while(n != 0) {
		digit = n%10;
		sum = sum + digit*digit*digit;
		n = n/10;
	}
	if (sum == temp)
		printf("this number is armstrong number");
	else
		("this is not armstrong number");
}