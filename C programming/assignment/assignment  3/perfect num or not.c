//Q6.Check the given number is Perfect number or not.
//Input: n = 28
//Output: Perfect

#include<stdio.h>
int main() {
	int num = 28;
	int sum = 0,i = 1;
	while (i < num) {
		if (num % i == 0) {
			sum += i; 
		}
		i++;  
	}
	if (sum == num)
		printf("%d is a Perfect Number.\n", num);
	else
		printf("%d is not a Perfect Number.\n", num);
}