// Q1.Accept two numbers from user and an operator (+,-,/,*,%) based on that perform the
//desired operations.

# include<stdio.h>
void main () {
	int a;
	int b,c;
	char op;
	printf("enter the first number :");
	scanf("%d",&a);
	printf("\nenter the second number :");
	scanf("%d",&b);
	printf("\nselect the opration + , - , * , / , % :");
	scanf(" %c",&op);

	if(op == '+') {
		c = a+b;
		printf("addition of a and b is %d :",c);
	} else if (op == '*') {
		c = a*b;
		printf("mutiplication of a and b is %d :",c);
	} else if (op == '-') {
		c = a-b;
		printf("div of a and b is %d :",c);
	}

	else if (op == '%') {
		c = a%b;
		printf("mod of a and b is %d :",c);
	}



}