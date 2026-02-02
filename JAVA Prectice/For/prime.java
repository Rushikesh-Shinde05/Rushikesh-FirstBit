class prime{
           public static void main (String[] args){
           int num =7;
           Boolean flag = true;
          for(int i = 2 ; i<num; i++)
          if(num % i == 0)
          flag = false;
          if(flag == true)
          System.out.println("Number is prime");
          else
          System.out.println("not prime");


       }
        }