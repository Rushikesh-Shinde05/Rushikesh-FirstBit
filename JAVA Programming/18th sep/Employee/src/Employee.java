class Employee{
              int id;
              String name;
              double salary;
              
              Employee(int id, String name, double salary) {
				super();
				this.id = id;
				this.name = name;
				this.salary = salary;
			}

			 
    
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

	public void display() {
		System.out.println("id of Employee :" + id);
		System.out.println("Name of employee:"+ name);
		System.out.println("Salary of employee:" + salary);
		
	}

	


} // Employee class ends here

class SalesManeger extends Employee
{
	double incentive;
	int target;
	
	
	
	
	SalesManeger(int id, String name, double salary, double incentive, int target) {
		super(id, name, salary);
		this.incentive = incentive;
		this.target = target;
	}
	double getIncentive() {
		return incentive;
	}
	void setIncentive(double incentive) {
		this.incentive = incentive;
	}
	int getTarget() {
		return target;
	}
	void setTarget(int target) {
		this.target = target;
	}
	
	public void display() {
		super.display();
		System.out.println("Incentive is:" + incentive);
		System.out.println("Target is: " + target);
	}
}// SalesManeger class ends here

class Admin extends Employee
{
	double Allowence;
	
	

	Admin(int id, String name, double salary, double allowence) {
		super(id, name, salary);
		Allowence = allowence;
	}

	double getAllowence() {
		return Allowence;
	}

	void setAllowence(double allowence) {
		Allowence = allowence;
	}
	
	public void display() {
		super.display();
		System.out.println("Allowence is :" + Allowence);
	}
	
} // Admin class ends here

class Hr extends Employee
{
	double Commision;
	
	
  Hr(int id, String name, double salary, double commision) {
		super(id, name, salary);
		Commision = commision;
	}

	double getCommision() {
		return Commision;
	}

	void setCommision(double commision) {
		Commision = commision;
	}
	public void display() {
		super.display();
		System.out.println("Commision is:"+Commision );
	}
} //hr class ends here



class Test
{
                public static void main(String[] agrs)
   {            
              
                Employee e1 = new Employee(1,"Russhikesh",100000);
                SalesManeger sm1 = new SalesManeger(2, "xyz", 10000, 20000, 5);
                Admin a1 = new Admin(2, "abc", 10000, 30000);
                Hr h1 = new  Hr(4, "jsh", 56004, 1230);
                e1.display();
                sm1.display();
                a1.display();
                h1.display();


              


                   

                
    }
}