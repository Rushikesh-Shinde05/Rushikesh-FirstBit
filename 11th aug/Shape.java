class Shape{
     void calculateArea(Triangle t){
     double area;
     area=0.5*t.getbase()*t.getheight();
     System.out.println("Area of Trangle is:" +area);
     }
    void calculateArea(Circle c){
    double area;
    area=3.14*c.getradius()*c.getradius();
    System.out.println("Area of circle is:"+area);
   }
     void calculateArea(Rectangle r){
      double area;
      area=r.getlength() * r.getbreath();
      System.out.println("Area of Rectangle is:"+area);

    }

} // shape class end here

class Triangle
{
   double base;
   double height;
   Triangle(){
   this.base = 0;
   this. height = 0;
   }
   Triangle(double base,double height){
   this.base=base;
   this.height=height;
   }
//setter
   void setbase(double b) {
   this.base=b;
    }
   void setheight(double h){
   this.height =h;
   }
//getter
   double getbase()
 {
   return this.base;
 }
  double getheight()
 {
  return this.height;
 }
  void display ()
 {
  System.out.println("Base:"+base);
  System.out.println("Height:"+height);

  } 
} //trangele end here

class Circle
{
     double radius;
     Circle()
     {
        this.radius=0;
     }
    Circle(double r)
  {
    this.radius=r;
  }
  void setradius(double r)
  {
  this.radius =r;
  }
   double getradius()
   {
  return this.radius;
  }
  void display()
  {
  System.out.println("Radius:"+this.radius);
  }
} //ends here

class  Rectangle
{
  double length;
  double breath;
 
 Rectangle(){
  this.length=1;
  this.breath=1;
  }
   Rectangle(double l,double b)
   {
   this.length=l;
   this.breath=b;
    }
 
//setter
  void setlenght(double l)
  {
    this.length=l;
  }
  void setbreath(double b)
  {
   this.breath=b;
  }
//getter
   double getlength()
  {
  return this.length;
  }
   double getbreath()
  {
  return this.breath;
  }
void display ()
 {
  System.out.println("Lenght:"+length);
  System.out.println("Breath:"+breath);

  } 


} //rectangle ends here


class Test{
   public static void main(String[] args)
   {
      Shape s1=new Shape();
      Triangle t1=new Triangle(5,3);
      t1.display();
      s1.calculateArea(t1);

      Circle c1= new Circle(5);
      c1.display();
      s1.calculateArea(c1);

      Rectangle r1=new Rectangle(5,3);
      r1.display();
      s1.calculateArea(r1);
   }
}

