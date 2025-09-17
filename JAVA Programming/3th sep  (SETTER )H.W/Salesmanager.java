class Salesmanager{
              
              int id,target,incentive;
              String name;
              double salary;
    
    void setId(int i)
    {
         this.id=i;
    }

    void setTarget(int t)
    {
         this.target=t;
    }

    void setIncentive(int in)
    {
         this.incentive=in;
    }
 void setName(String n)
    {
         this.name=n;
    }
 void setSalary(double s)
    {
         this.salary=s;
    }


    

} // Employee class ends here

class Test
{
                 public static void main(String[] agrs)
   {
                Salesmanager s1 = new Salesmanager();
                s1.setId (1);
                s1.setTarget (70); 
                s1.setIncentive (100000);
                s1.setName ("ABC");
                s1.setSalary (100000);
                
                System.out.println("ID " +s1.id);
                System.out.println("TARGET " +s1.target);
                System.out.println("INCENTIVE " +s1.incentive);
                System.out.println("NAME " +s1.name);
                System.out.println("SALARY " +s1.salary);
                
                
    }
}