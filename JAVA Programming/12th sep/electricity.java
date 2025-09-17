class ElectricityBill 
{ 
    int id;
    String name;
    static double RatePerUnit;
    static {RatePerUnit =50;}
 

     void setId(int i)
     {
       this.id=i;
     }
   void setname(String n)
     {
       this.name=n;
     }
static setRatePerUnit(double RPU)
     {
        RatePerUnit=RPU;
     }

       getId()
       {
       return this.i;
       }
       getname(String n)
       {
       return this.n;
       }

      getRatePerUnit(double RPU)
     {
        RatePerUnit this.RPU;
     }

   void display ()
    {
        System.out.println("ID of "+ this.id);
        System.out.println("name of "+ this.name);
        System.out.println("ratepuerunit is "+ this.RatePerUnit);
        System.out.println();
    }


}