class SalesManager{
    int Id,Target,Incentive;
    String Name;
    double Salary;
    
    void setid(int i){
        this.Id = i;
    }
     int getid(){
         return Id;
     }
     
     void settarget(int t){
         this.Target = t;
     }
     int gettarget(){
         return Target;
     }
     
     void setincentive(int in){
         this.Incentive = in;
     }
     int getincentive(){
         return Incentive;
     }
     
     void setname(String n){
         this.Name = n;
     }
     String getname(){
         return Name;
     }
     
     void setsalary(double s){
         this.Salary =s;
     }
     double getsalary(){
         return Salary;
     }
     
     public static void main(String [] args){
         
         SalesManager SM = new SalesManager();
         
         SM.setid(1);
         SM.settarget(5);
         SM.setincentive(50000);
         SM.setname("XYZ");
         SM.setsalary(100000.0);
         
         System.out.println("ID of employee:" + SM.getid());
         System.out.println("Target of employee :" + SM.gettarget());
         System.out.println("Incentive of employee:" + SM.getincentive());
         System.out.println("Name of employee:" + SM.getname());
         System.out.println("Salary of employee:" + SM.getsalary());




     }
}