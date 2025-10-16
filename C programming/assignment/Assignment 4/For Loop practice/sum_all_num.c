//Q10.Find Sum of first and last digit of given number.
//Input: n = 12345
//Output: 6 (1 + 5)
#include<stdio.h>
void main(){
	int n= 12345;
	int first,last,sum ;
		last = n%10;

	for(;n>=10;){
		n=n/10;
	}
	
	first = n;
	sum = first+last;
	printf("sum of all number is %d",sum);
}