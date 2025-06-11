//Q2. Print table for given number.
//Input: n = 5
//Output: 5 10 15 20 25 30 35 40 45 50

# include<stdio.h>
//void main () {
//	int  n = 5,i = 1;
//	while ( i <= 10) {
//		printf("\n%d",n*i);
//		i++ ;
//	};
//}

// using for loop

void main () {
	int n = 5 ;
	int res;
	for(int i =1; i<=10;i++) {
		res = n*i;
		printf("\n%d*%d = %d",n,i,res);
	}
}

