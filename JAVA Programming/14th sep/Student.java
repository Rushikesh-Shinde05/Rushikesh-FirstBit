class Student 
{
      int fbs_id;
      String name;
      double distance_Traveled;
     static int student_count;
 
    
  
Student()
      {
      this.fbs_id = 12345;
      this.name = "Rushikesh";
      this.distance_Traveled  = 25;
      this.student_count=5;
      }

      Student(int i , String n, double d, int s)
     {
         this.fbs_id = i;
         this.name = n;
         this.distance_Traveled = d;
         this.student_count = s;
     }

  


void setFbs_Id(int i)
  {
     this.fbs_id = i; 
  }
void setName(String n)
  {
     this.name = n; 
  }

void setDistance_Traveled(int d)
  {
     this.distance_Traveled = d; 
  }

void setStudent_count(int s)
  {
     this.Student_count = s; 
  }

static int setcount()
  {
    this.Studentcount;
  }


int getFbs_Id()
  {
    return this.fbs_id; 
  }


String getName()
  {
     return this.name; 
  }

int getstudent_count()
  {
    return this.student_count; 
  }

double getDistance_Traveled()
  {
    return this.distance_Traveled; 

static int getcount()
  {
    return this.Studentcount;
  }
  
void display()
  {
  System.out.println("FBS_ID " + fbs_id);
  System.out.println("NAME " + name);
  System.out.println("Distance " + distance_Traveled);
  System.out.println("COUNT " + student_count);
  }

}  // Student cllass ends here


class Test {
            public static void main (String [] args)
           {
                //Student s1 = new Student();
                Student s1 = new Student(1,"ABC",25.5,2);
                

               s1.display();
                
           }


     
}