//Q9.Check the given number is Palindrome number or not. 
//Input: n = 121 
//Output: Palindrome 
#include<stdio.h>
void main(){

 int n = 121;
 int rev = 0, digit,temp = n;
 for(;n !=0; ){
 	digit = n%10;
 	rev = rev*10+digit;
 	n =n/10;
 }
 	if (rev == temp)
	printf(" number is palindrome");
	else
	printf("number is not palindrome");
}