class Armstrong{
 public static void main(String [] args){
          int n = 153;
          int temp = n, sum =0,digit;
        while (n != 0){
         digit = n%10;
         sum = sum + digit * digit * digit ;
         n=n/10;
        }
         if (sum == temp)
            System.out.println("This number is armstrong number");
         else
             System.out.println("Ths number is Armstrong number");
 }
}