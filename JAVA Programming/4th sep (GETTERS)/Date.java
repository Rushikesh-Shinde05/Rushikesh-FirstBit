class Date{
int day, month , year;
String dow;

    Date() //default constructor
   {
      this.day = 15;
      this.month = 9;
      this.year = 2025;
      this.dow = "MON";
System.out.println("default constuctor");
   }
    
     
     Date(int d,int m, int y, String str)  //paramiterized constuctor
     {
       this.day=d;
       this.month=m;
       this.year=y;
       this.dow=str;
System.out.println("paramiterized constuctor");

     }
  
    void setDay(int d)
    {
         this.day=d;
    }

    void setMonth(int m)
    {
         this.month=m;
    }

    void setYear(int y)
    {
         this.year=y;
    }

    void setDOW(String str)
    {
         this.dow=str;
    }
   
      int getDay()
    {
      return this.day;
     }

     int getMonth()
     {
      return this.month;
     }
     int getYear()
    {
      return this.year;
     }
     String getDOW()
    {
      return this.dow;
     }

 void display()
           {
             System.out.println(this.day + " / " + this.month + " / " + this.year + " / " + "(" + this.dow + ")");
           } 


} // Date class ends here

class Test
{
                 public static void main(String[] args)
   {
                Date d1 = new Date();
                Date d2 = new Date(14,9,2025,"mon");

                if(d1.getDay() > d2.getDay())
                {
                  System.out.println("d1 is xyz");
                 }
                else
                {
                  System.out.println("d2 is xyz"); 
                 }
                d1.setDay (10);
                d1.setMonth (9); 
                d1.setYear (2025);
                d1.setDOW ("SAT"); 
                System.out.println("DAY " +d1.day);
                System.out.println("MONTH " +d1.month);
                System.out.println("YEAR " +d1.year);
                System.out.println("DATE OF WEEK " +d1.dow);      
                d1.display();      
                d2.display();

                
                    
    }
               
}