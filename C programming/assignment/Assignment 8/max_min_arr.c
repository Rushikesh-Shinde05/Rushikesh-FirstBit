//Q1. Find minimum and maximum number in array using function. 

#include<stdio.h>
int minMax(int *mn, int *mx);
int main(){
int min,max;
minMax(&min,&max);


printf("maximum number in arr is :%d\n",max);
	printf("minimum number in arr :%d\n",min);
	return 0;
}


int	 minMax(int *mn , int *mx){
	int arr[] = {1,2,3,4,5};
	 *mx=arr[0];
	 *mn=arr[0];
	for(int i = 0; i<5;i++){
		 if (arr[i] < *mn ) {
          *mn = arr[i];
		 }
		if (arr[i]> *mx){
		 *mx = arr[i];
		 } 
		 
	}
}
	
	
	
	
