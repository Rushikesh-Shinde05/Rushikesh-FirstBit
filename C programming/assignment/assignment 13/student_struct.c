//Q1
#include<stdio.h>
#include<string.h>
struct student {
	int rollNo;
	char name[20];
	int marks;
};
void main(){
	struct student s1,s2;
	s1.marks = 100;
	s1.rollNo = 1;
strcpy (s1.name, "xyz");
	printf("%d\n",s1.marks);
	printf("%s\n",s1.name);
	printf("%d\n",s1.rollNo);

}