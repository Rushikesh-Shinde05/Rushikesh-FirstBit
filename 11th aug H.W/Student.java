import java.util.Scanner;
class  Student
{
   int id;
   String name;

   Student(int id,String name)
     {
       this.id=id;
       this.name=name;
     }    
                                
  void setid(int id)
     {
        this.id=id;
     }
    void setname(String name)
     {
        this.name=name;
     }
//getter
int getid()
     {
       return id;
     }

String getname()
     {
       return name;
     }
    void display()
  {
     System.out.println("ID:"+id);
     System.out.println("Name:"+name);
  }
} // student class ends here

 class Test
{
   public static void main (String [] args)
     {
        Student obj1 = new Student (101, "xyz");
        obj1.display();
        Scanner sc = new Scanner (System.in);
        System.out.println("Enter ID:");

       int id = sc.nextInt();    //consume new line 
       sc.nextLine();
       System.out.println("enter Name:");
       String name = sc.nextLine();

      Student obj2 = new Student(id,name);
      obj2.display();
      sc.close();
     }
}