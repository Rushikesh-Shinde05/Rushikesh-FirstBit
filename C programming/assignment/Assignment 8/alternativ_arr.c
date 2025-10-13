//Q5. Print alternate elements in array.
#include<stdio.h>
void main() {
	int arr[] = {1,2,3,4,5};
	for(int i =0; i<=5; i++) {
		if(i%2==0) {
			continue;
		}
		printf("%d\n",i);


	}
}