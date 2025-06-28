#include<stdio.h>
void main() {
	int ch;
	do {

		printf(" \n1 FOR EVEN OR ODD \n 2 FOR PRIME OR NOT \n 3 FOR PALINDROME OR NOT \n 4 FOR POSITIVE NAGITIVE OR NOT \n 5 FOR REVERSE \n 6 FOR FINDE SUM OF DIGIT \n");


		printf("ENTER YOUR CHOICE:");
		scanf("%d",&ch);
		if(ch==1) {
			int even=2;
			printf(" ENTER THE NUMBER TO CHECK EVEN OR ODD :");
			scanf("%d",&even);
			if(even%2==0)
				printf(" THIS NUMBER IS EVEN ");
			else
				printf(" THIS NUMBER IS ODD");
		} else if(ch==2) {
			int num;
			printf(" ENTER THE NUMBER TO CHECK PRIME OR NOT ");
			scanf("%d",&num);

			if(num%1==0 && !(num%2==0))
				printf(" THIS NUMBER IS PRIME: %d",num);
			else
				printf(" THIS NUMBER IS NOT PRIME");

		} else if( ch==3) {
			int num2,r1;

			printf("ENTER THE NUMBER TO CHECK PALINDROME OR NOT:");
			scanf("%d",&num2);
			int demo=num2,res=0;
			while(num2>0) {
				r1=num2%10;
				res=res*10+r1;
				num2=num2/10;

			}
			if(demo==res)
				printf(" THIS NUMBER IS PALINDROME");
			else
				printf("THIS NUMBER IS NOT PALINDROME");

		}

		if(ch==4) {
			int num3;
			printf(" ENTER THE NUMBER TO CHECK POSITIVE, NAGITIVE OR ZERO :");
			scanf("%d",&num3);

			if(num3>0) {
				printf(" THIS NUMBER IS POSITIVE");
			} else if(num3==0)
				printf("THIS NUMBER IS ZERO");

			else
				printf("THIS NUMBER IS NAGITIVER");

		}
		if(ch==5) {
			int num4;
			int temp=num4;
			printf("ENTER THE NUMBER TO CHECK REVERSE");
			scanf("%d",&num4);
			int rev=0;
			while(num4!=0) {
				int r1=num4%10;
				rev=rev*10+r1;
				num4=num4/10;

			}
			printf(" THE REVERSE IS %d",rev);
		}
		if(ch==6) {
			int num4;
			printf(" ENTER THE NUMBER TO CHECK OF SUM:");
			scanf("%d",&num4);
			int r1, sum=0;
			while(num4>0) {
				r1=num4%10;
				sum=sum+r1;
				num4=num4/10;
			}
			printf(" THE ADDITION OF NUM IS %d",sum);

		}
	} while(ch<6);



}
