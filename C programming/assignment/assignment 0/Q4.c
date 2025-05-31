// Q4. Write a C program to swap two numbers using a temporary third variable. 

void main(){
	int a,b,temp;
	a = 1;
	b = 2;
	temp = a;
	a = b;
	b = temp;
	printf("a %d b %d ", a,b);
}