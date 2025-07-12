//Q5. Print alternate elements in array.
#include<stdio.h>
int alternative(int *alt);
void main() {
int alt;
alternative(&alt);
}
int alternative(int *alt){
		int arr[] = {1,2,3,4,5};
	for(int i =0; i<=5; i++) {
		if(i%2==0) {
			continue;
		}
		printf("%d\n",i);


	}
}