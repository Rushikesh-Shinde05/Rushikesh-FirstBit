import java.util.Scanner;
class Sum3Array
{
       public static void main(String[] args)
        {
           Scanner sc = new Scanner(System.in);
           int n = 5;
           int arr [] = new int [n];
           int brr [] = new int [n];
           int crr [] = new int [n];
          
        for(int i =0; i<arr.length;i++)
        {
          System.out.println("enter 5 number to 1st array");
          arr[i] = sc.nextInt();
        }
 
          for(int i =0; i<brr.length;i++)
        {
          System.out.println("enter 5 number to 2nd array");
          brr[i] = sc.nextInt();
        }

     for(int i = 0; i<n; i++){
		crr[i] = arr[i] + brr[i];
	}

      System.out.println("Sum of 2 Array is :");
      for(int i =0; i<n; i++)
      {
                    System.out.println(crr[i]);
       }
	
			


           
        } //p.s.v.m ends here
} //SumArray end here