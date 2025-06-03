//Q2.Write a program to check given 3 digit number is pallindrome or not. 

void main()
{
	int a = 123 , r1,r2,r3,res,orignal;
	 orignal = a;
	r1 = a%10;
	a = a/10;
	
	r2 = a%10;
	a = a/10;

	r3 =a ;
	
	res = r1*100 + r2 * 10 + r3;
	
	if (orignal == res)
	{
		printf("this digit is pallindrom");
	}
	else
	{
		printf("this digit is not pallindrom");
	}
}