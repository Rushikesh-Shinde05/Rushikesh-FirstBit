import java.util.Scanner;
class SortArray
{
    public static void main (String [] args)
    {
       Scanner sc = new Scanner(System.in);
        int arr [] = new int [5];

    
      for(int i=0; i< arr.length; i++)
       {
           System.out.println("enter 5 number here");
           arr[i] = sc.nextInt();
       }
  int n = arr.length;

    int i, j, temp;

    // Basic sorting logic
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) {
                // Swap arr[i] and arr[j]
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    // Print sorted array
    System.out.println("Sorted array: ");
    for (i = 0; i < n; i++) {
        System.out.println("sorted Array " + arr[i]);
    }

 } // p.s.v.m ends here

} // //sortArray class ends here