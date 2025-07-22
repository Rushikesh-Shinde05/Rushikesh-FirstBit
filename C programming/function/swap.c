//swap num
int swap();
#include<stdio.h>
int main () {
	int no1 = 10,no2 = 20;
	printf("before swaping no1 = %d no2 = %d",no1,no2);
	swap(& no1, &no2);
	printf("\nafter swaping no1 = %d no2 = %d",no1,no2);
}

int swap (int *a,int *b) {
	int temp;
	temp =*a;
	*a = *b;
	*b = temp;
	return 0;
}