class fan{
         int fan;
         String  colour;
         String  onoff;

    void  setFan(int F){

        this.fan = F;
   }
 int getFan(){

        return fan;
   }

  void setColour(String C){

       this.colour = C;
   }

   String getColour(){
      return colour;
 }

   void  setOnOff(String of){
        this.onoff = of;
}
   String getOnOff(){
    return onoff;
}

 public static void main(String [] args){
        
    fan f = new fan();
    f.setFan(3);
    f.setColour("white");
    f.setOnOff("ON");

  System.out.println(f.getFan());
  System.out.println(f.getColour());
  System.out.println(f.getOnOff());


}

  
}