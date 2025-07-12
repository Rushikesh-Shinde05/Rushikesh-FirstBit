//Q2. Search the given number in array.

#include<stdio.h>
int search(int *find);
void main()
{
int find;
search(&find);
}
int search(int *find){
		int arr[] = {1,2,3,4,5};
	 *find = 2;
	int index =sizeof (arr) / sizeof (arr[0]);
	for(int i = 0; i< index; i++){
		if (arr[i] == *find){
		printf("%d %d\n",*find,i);
		}
		
	}
}