//Q4.Check the given number is prime or not.
//Input: n = 7
//Output: Prime

# include<stdio.h>
int main () {
	int n = 5;
	int i,isprime = 1;
	if (n <=1) {
		printf("not prime\n");
	}
	for (i = 2; i <= n/2 ; i++ ) {
		if (n%i ==0) {
			isprime =0;
		}
	}
	if (isprime)
		printf("number is prime\n");
	else
		printf("number is not prime\n");


}