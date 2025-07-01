//Q2
#include<stdio.h>
struct Employee{
	int id;
	char name[20];
	float salary;
};
void main ()
{
struct Employee s1;
s1.id = 1;
strcpy(s1.name ,"Rushikesh");
s1.salary = 200000;
printf("ID OF EMPLOYEE IS :%d\n",s1.id);
printf("NAME OF EMPLOYEE IS :%s\n",s1.name);
printf("SALARY OF EMPLOYEE IS :%lf\n",s1.salary);

	
}