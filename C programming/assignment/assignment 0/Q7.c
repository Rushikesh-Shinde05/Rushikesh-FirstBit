//Q7. Write a C program to convert given minutes into hours and remaining minutes.

void main()
{
int  min,totalmin = 130 , final;
min = totalmin  / 60 ;
 final = totalmin % 60;
printf("hour will be %d and remaininng min will be %d", min,final );
}