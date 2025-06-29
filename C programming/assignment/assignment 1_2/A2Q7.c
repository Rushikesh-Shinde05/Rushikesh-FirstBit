//Q7 .Accept the age and check if the person is: 
//Child (age < 12),Teenager (12–19),Adult (20–59),Senior (60 and above)

# include<stdio.h>
void main ()
{
	int a;
	printf(" Enter your age :");
	scanf("%d",&a);
	if (a < 12)
	printf("Child");
	else if (a < 20)
	printf("Teenager");
	else if (a < 59)
	printf("Adult");
	else if (a >= 60)
	printf("Senior");
}