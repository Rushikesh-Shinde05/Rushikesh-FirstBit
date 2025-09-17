import java.util.Scanner;
class EvenOdd
{
    public static void main (String [] args)
    {
      Scanner sc= new Scanner(System.in);
      int arr[] = new int [5];

      for(int i=0; i<arr.length;i++)
      {
         System.out.println("Enter 5 numbers" );
         arr[i] = sc.nextInt();
      }

      
	for(int i = 0; i<5; i++) {
		if(arr[i]%2 ==0) {
			System.out.println(arr[i] + " numberr is even");
		} else{
			System.out.println(arr[i]+ " number is odd");
                       }
	}


    } //p.s.v.m ends here
} //EvenOdd class ends here
