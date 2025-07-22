# include<stdio.h>
int  leapyear(); // declaration
void main () {
	int final = leapyear();
	if ( final == 0)
		printf("this year is leap");
	else
		printf("this year is not leap");
} // function Call

int leapyear () {
	int a = 2004;
	int orignal, res;
	orignal = a;
	if ((a % 4 == 0 && a % 100 != 0) || (a % 400 == 0)) { // Leap Year Logic
		res = 1;  // leap year
	}
	return 0;
} // Defination
