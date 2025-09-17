import java.util.Scanner;
class SumArray
{
    public static void main (String [] args)
   {
       Scanner sc = new Scanner (System.in);
       int arr [] = new int [5];


       for(int i =0; i< arr.length; i++) 
       {
         System.out.println("Enter 5 number");
         arr[i] = sc.nextInt();
       } //this block takes 5 times number

         int sum =0;
	for(int i =0; i<5; i++){
		sum+=arr[i];
	
	}
     System.out.println("Sum Array is : "+sum);
     
		

   }
  
}