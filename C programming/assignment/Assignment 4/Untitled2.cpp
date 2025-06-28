//Q2. Print prime numbers in the given range 1 to n.

# include<stdio.h>
int main () {
	int n = 5;
	int i,isprime = 1;
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