//Q4. Find odd and even among the numbers.
#include<stdio.h>
void main() {
	int arr[] = {1,2,3,4,5};

	for(int i = 0; i<5; i++) {
		if(arr[i]%2) {
			printf("odd num is : %d\n",arr[i]);
		} else
			printf("even num is :%d\n",arr[i]);
	}
}