# include<stdio.h>
int evenOdd(); //decleration
void main() {
	int res;
	res = evenOdd();
	if (res == 0)
		printf("number is even");
	else
		printf("number is odd");

} //Function Call

int evenOdd () {
	int a;
	printf("enter the number :");
	scanf("%d",&a);
	if(a%2 ==0)
		return 0;
} // defination
