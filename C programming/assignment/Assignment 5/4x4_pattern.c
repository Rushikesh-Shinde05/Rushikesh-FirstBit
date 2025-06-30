//Print a solid square pattern 
//Input: n = 4

#include<stdio.h>
void main ()
{
	int n = 0 ;
	for(;n<4;n++){
		for (int j = 0;j<4;j++){
			printf("* ");
		}
		printf("\n");
	}
}