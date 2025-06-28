//Q3. Print perfect numbers in the given range 1 to n. 
#include<stdio.h>
int main() {
	int num = 28;
	int sum = 0,i = 1;
	for (;i < num;i++) {
		if (num % i == 0) {
			sum += i; 
		}
	}
	if (sum == num)
		printf("%d is a Perfect Number.\n", num);
	else
		printf("%d is not a Perfect Number.\n", num);
}