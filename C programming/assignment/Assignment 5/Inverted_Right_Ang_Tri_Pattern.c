//Print an inverted right-angled triangle pattern 
//Input: n = 5 

#include<stdio.h>
void main ()
{
	
	for(int n = 5;n>=1;n--){        // Column
	//	printf("* ");
		for (int j = 1;j<=n;j++){  //Row 
			printf("* ");
		}
		printf("\n");            // New Line
	}
}