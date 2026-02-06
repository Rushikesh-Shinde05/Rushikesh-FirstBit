class Employee{
    int Id;
    String Name;
    double Salary;
    
    void setid(int i){
        this.Id = i;
    }
    int getid(){
        return Id;
    }
    
    void setname(String n){
        this.Name = n;
    }
    String getname(){
        return Name;
    }
    
    void setsalary(double s){
        this.Salary = s;
    }
    double getsalary(){
        return Salary;
    }
    
    public static void main(String[]args){
        Employee E = new Employee();
        
        E.setid(1);
        E.setname("XYZ");
        E.setsalary(1000000.0);
        
        System.out.println("ID of employee is :" + E.getid());
        System.out.println("Name of employee is :" +E.getname());
        System.out.println("Slary of employee is :"+ E.getsalary());
    }
}