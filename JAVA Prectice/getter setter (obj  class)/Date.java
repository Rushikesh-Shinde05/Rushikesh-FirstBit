class Date{
    int Day,Month,Year;
    
    void setday(int d){
        this.Day = d;
    }
    int getday(){
        return Day;
    }
    
    void setmonth(int m){
        this.Month = m;
    }
    
    int getmonth(){
        return Month;
    }
    
    void setyear(int y){
        this.Year = y;
    }
     int getyear(){
         return Year;
     }
     
     public static void main(String [] args){
         Date D = new Date();
         
         D.setday(6);
         D.setmonth(2);
         D.setyear(2026);
         
         System.out.println("Day of tne month :" + D.getday());
         System.out.println("Month of the year:" + D.getmonth());
         System.out.println("Year of the century:" + D.getyear());
     }
}