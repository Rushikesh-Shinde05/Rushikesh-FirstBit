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

} // Date class ends here

class Test
{
                 public static void main(String[] agrs)
   {
                Date d1 = new Date();
                d1.setDay (10);
                d1.setMonth (9); 
                d1.setYear (2025);
                d1.setDOW ("sat"); 
                System.out.println("DAY " +d1.day);
                System.out.println("MONTH " +d1.month);
                System.out.println("YEAR " +d1.year);
                System.out.println("DATE OF WEEK " +d1.dow);
                
    }
}