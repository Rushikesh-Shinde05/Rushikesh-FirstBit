#include<stdio.h>

void main () {
	int s_price;
	int cost_price;
	int discount;

	printf("ENTER THE ORIGNAL PRICE OF BOOK :");
	scanf("%d",&cost_price);
	if(cost_price > 1000) {

		printf("ENTER THE DISCOUNT :");
		scanf("%d",&discount);
		s_price = cost_price * discount / 100;
		printf("YOUR FINALL PRICE WILL BE %d WITH DISCOUNT OF %d",s_price,discount);
	} else {
		printf("you'll not get discount");
	}
}





