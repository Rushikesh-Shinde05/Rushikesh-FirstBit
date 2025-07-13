//Q5 strncpy
#include<stdio.h>
#include<string.h>

void main(){
	char str1[] = "hello";
	char str2[20];
	strncpy(str2,str1,2);  // removes
	printf("%s",str2);
	
	
}