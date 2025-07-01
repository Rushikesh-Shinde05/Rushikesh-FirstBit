//Q3 Admin
#include<stdio.h>
#include<string.h>

struct Admin {
	int id;
	char name[20];
	double salary;
	int allowance;
};
void main () {
	struct Admin a1;
	a1.id = 1;
	strcpy(a1.name,"vuso");
	a1.salary = 1000000;
	a1.allowance = 111111;
	printf("ID IF ADMIN IS :%d\n",a1.id);
	printf("NAME OF ADMIN IS :%s\n",a1.name);
	printf("SALARY OF ADMIN IS :%lf\n",a1.salary);
	printf("ALLOANCE OF ADDMIN IS %d\n",a1.allowance);
}