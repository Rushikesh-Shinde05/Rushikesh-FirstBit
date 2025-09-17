class Employee{
              int id;
              String name;
              double salary;
    
    void setId(int i)
    {
         this.id=i;
    }

    void setName(String n)
    {
         this.name=n;
    }

    void setSalary(double s)
    {
         this.salary=s;
    }

     int getId()
    {
       return this.id;
    }

     String getName()
    {
       return this.name ;
    }

    double getSalary()
    {
       return this.salary;
    }



} // Employee class ends here

class Test
{
                 public static void main(String[] agrs)
   {
                Employee e1 = new Employee();
                e1.setId (1);
                e1.setName ("ABC"); 
                e1.setSalary (100000);
                
                System.out.println("ID " +e1.id);
                System.out.println("NAME " +e1.name);
                System.out.println("SALARY " +e1.salary);
                
                
    }
}