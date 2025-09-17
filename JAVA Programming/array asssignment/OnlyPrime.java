import java.util.Scanner;
class OnlyPrime
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        int arr [] = new int [5];

    
      for(int i=0; i< arr.length; i++)
       {
           System.out.println("enter 5 number here");
           arr[i] = sc.nextInt();
       }

      //  int size  = (arr) / (arr[0]);
        for(int i = 0; i<arr.length; i++){
		if(i%arr[i] == 0){
			System.out.println("OnlyPrime Number: " +arr[i]);
		}
	}

    } // p.s.v.m ends here
} // OnlyPrime class ends here
