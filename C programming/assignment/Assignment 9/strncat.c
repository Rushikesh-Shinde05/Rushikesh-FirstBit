//Q6 strncat
#include<stdio.h>
#include<string.h>

void main(){
	char str1[20] = "hello";
	char str2[20] = "world";
	strncat(str1,str2,2);
	printf("%s",str1);
	
	
}