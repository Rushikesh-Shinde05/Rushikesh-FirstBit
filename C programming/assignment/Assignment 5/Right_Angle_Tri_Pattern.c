// Print a right-angled triangle pattern 
//Input: n = 5 

#include<stdio.h>
void main ()
{
	
	for(int n = 1;n<6;n++){        // Column
	//	printf("* ");
		for (int j = 1;j<=n;j++){  //Row 
			printf("* ");
		}
		printf("\n");            // New Line
	}
}