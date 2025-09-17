import java.util.Scanner;
class SearchNum 
{
     public static void main(String [] args)
  {
     Scanner sc=new Scanner(System.in);
     int arr []= new int[5];

    
      for(int i =0; i< arr.length; i++) 
   {
       System.out.println("Enter 5 number "); 
       arr[i]=sc.nextInt();
   }
         
        System.out.print("Enter number to search: ");
        int num = sc.nextInt();
	for(int i = 0; i< arr.length; i++){
		if (arr[i] == num)
                {
		System.out.println("number "+num+ " found at " + i);
		}
		
	}
 
     
    
  } //p.s.v.m ends here

} //SearchNum class ends here