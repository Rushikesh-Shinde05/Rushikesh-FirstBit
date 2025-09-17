class Date{
int day, month , year;
String dow;
  
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
                 public static void main(String[] agrs)
   {
                Date d1 = new Date();
                Date d2 = new Date();

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
                   
                d1.display();          
    }
               
}