//Q3.Sum of numbers in given range. 
//Find sum of numbers from start to end. 
//Input: start = 1, end = 5 
//Output: 15 

# include<stdio.h>
void main ()
{
	int st = 1 ,e = 5,sum,i;
	for(int i = st; i <= e; i++)
	{
		sum = sum+i;
		printf("%d %d",sum,i);
	}
	
}