import java.util.Scanner;
class MergeArray
{
      public static void main (String [] args)
      {
           Scanner sc = new Scanner (System.in);
           
           int arr [] = new int [5];
           int brr [] = new int [5];
           int crr [] = new int [10];

         for(int i=0; i< arr.length; i++)
       {
           System.out.println("enter 5 number 1st array");
           arr[i] = sc.nextInt();
       }



          for(int i=0; i< brr.length; i++)
       {
           System.out.println("enter 5 number 2nd array");
           crr[i] = sc.nextInt();
       }

        for(int i = 0; i < arr[i];i++){
		crr[i] = arr[i];
	}
	
	for(int i = 0; i < brr[i];i++){
		crr[i+5] = brr[i];
	}
	for(int i = 0; i< 10; i++){
	System.out.println("Sum of 2 array is: "+crr[i]);	
	}


       

      } // p.s.v.m class end here
} //MergeArray class ends here