//Q2. Search the given number in array.

#include<stdio.h>
void main()
{
	int arr[] = {1,2,3,4,5};
	int num = 1;
	int index =sizeof (arr) / sizeof (arr[0]);
	for(int i = 0; i< index; i++){
		if (arr[i] == num){
		printf("%d %d\n",num,index);
		}
		
	}
}