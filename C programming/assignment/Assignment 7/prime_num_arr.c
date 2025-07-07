//Q6. Accept array and print only prime numbers of array. 
#include<stdio.h>
void main()
{
	int arr[] = {1,2,3,4,5};
	int size = sizeof(arr) / sizeof(arr[0]);
	for(int i = 0; i<size; i++){
		if(i%arr[i] == 0){
			printf("%d\n",size);
		}
	}
}