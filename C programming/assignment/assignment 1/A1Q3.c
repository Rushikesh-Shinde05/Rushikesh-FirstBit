//Q3. Write a program to check whether a given year is a leap year.

void main()
{

int a = 2002 , r1,r2,r3 , orignal , res;

orignal = a;

r1 = a%10;
a = a/10;

r2 = a%10;
a = a/10;

r3 = a;

res = r1*100 + r2*10 +r3;

if (res == orignal)
{
	printf("this is leap year");
}
else
{
	printf("this is not leap year");
}
}