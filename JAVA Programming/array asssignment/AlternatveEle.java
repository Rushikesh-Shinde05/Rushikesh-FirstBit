import java.util.Scanner;
class AlternatveEle
{
  public static void main(String[] args)
   {
      Scanner sc= new Scanner(System.in);
      int arr[] = new int [5];

     for(int i =0; i<arr.length; i++)
     {
         System.out.println("Enter 5 numbers");
         arr[i]  = sc.nextInt();
     }
         for(int i =0; i<=arr.length; i++) {
		if(i%2==0) {
			continue;
		}
                  System.out.println("Alternative Number is :" + i);
                                  }
      


   } //p.s.v.m ends here
} // AlternativeEle claa ends here