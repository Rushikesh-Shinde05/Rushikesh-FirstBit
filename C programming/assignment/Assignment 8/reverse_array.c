//Q9 Reverse the array
#include<stdio.h>
int rever(int *rev);

int main() {
	int rev;
	rever(&rev);

	return 0;
}
int rever(int *rev) {
	int arr[] = {1,2,3,4,5};
	int n = sizeof(arr)/ sizeof(arr[0]);
	for(int i = n -1; i >= 0; i--) {
		printf("%d",arr[i]);

	}
}