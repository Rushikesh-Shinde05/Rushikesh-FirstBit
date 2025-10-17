//
//Armstrong num till 5000
#include <stdio.h>

int main()
{    
    int j =1;
for(int j=1;j<=5000;j++)
{
    int no=j,rem,sum;
    //printf("enter the number:");
   // scanf("%d",&no);
    int count =0;
    int temp = no;
    while(no>0){
        count++;
        no = no/10;
    }
    

no = temp;
while(no>0){
    rem = no%10;
    int i =1,res =1;
    for(int i = 1;i<=count;i++)
    
        res=res*rem;
    
    
    sum = sum+res;
    no =no/10;
}
if(sum == temp)
printf("number is Armstrong number %d",temp);
// else
// printf("Number is No Armstrong number");
  }
  
}