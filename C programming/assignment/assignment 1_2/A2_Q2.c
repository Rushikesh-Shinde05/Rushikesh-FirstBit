//Q4.Ask the user to enter marks.
//Then show the result based on these rules:
//If marks are more than 75 ? show "Distinction"
//If marks are more than 65 ? show "First Class"
//If marks are more than 55 ? show "Second Class"
//If marks are 40 or more ? show "Pass Class"
//If marks are less than 40 ? show "Fail"

# include<stdio.h>
void main() {
	int m;
	printf("Enter the marks :");
	scanf("%d",&m);
	if (m > 75)
		printf("Distinction");
	else if (m > 65 )
		printf("First Class");
	else if (m >55)
		printf("Second class");
	else if (m >=40)
		printf("Pass classs");
	else if(m < 40)
		printf("Fail");
}