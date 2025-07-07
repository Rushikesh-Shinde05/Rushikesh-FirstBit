//Q1. Find minimum and maximum number in array. 

#include<stdio.h>
void main ()
{
	int arr[] = {1,2,3,4,5};
	int max=arr[0];
	int min=arr[0];
	
	for(int i = 0; i<5;i++){
		 if (arr[i] < min ) {
          min = arr[i];
		 }
		if (arr[i]> max){
		 max = arr[i];
		 }
	}
	printf("maximum number in arr is :%d\n",max);
	printf("minimum number in arr :%d\n",min);
	
}