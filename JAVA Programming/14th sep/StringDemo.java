class StringDemo
{
   public static void main (String[] args)
 {
     String str1 = "Hello";
     String str2 = new String("Hello");
     String str3 = "Hello";

System.out.println(str1==str3);
System.out.println(str1==str2);
System.out.println(str1.equals(str2));

 }
}