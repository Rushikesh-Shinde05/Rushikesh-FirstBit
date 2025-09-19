class Student 
{
      private static final int Studentcount = 0;
	  int fbs_id;
      String name;
      double distance_Traveled;
      static int count;
    	static {
    		count =0;
    		}
    	
     
 
    
  
Student()
      {
      this.fbs_id = 12345;
      this.name = "Rushikesh";
      this.distance_Traveled  = 25;
      count++;
     
      }

      Student(int i , String n, double d, int s)
     {
         this.fbs_id = i;
         this.name = n;
         this.distance_Traveled = d;
         count++;
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
    return this.count; 
  }

double getDistance_Traveled()
  {
    return distance_Traveled; 
  }

void display()
  {
  System.out.println("FBS_ID " + fbs_id);
  System.out.println("NAME " + name);
  System.out.println("Distance " + distance_Traveled);
  System.out.println("COUNT " + count);
  }

}  // Student class ends here

class PlacedStudent extends Student
{
	int fbs_id;
	String CompanyName = "Anything";
	String  designation;
	double distance_Traveled;
	
	
	
	PlacedStudent(int fbs_id, String companyName, String designation, double distance_Traveled) {
		super();
		this.fbs_id = fbs_id;
		CompanyName = companyName;
		this.designation = designation;
		this.distance_Traveled = distance_Traveled;
	}
	int getFbs_id() {
		return fbs_id;
	}
	void setFbs_id(int fbs_id) {
		this.fbs_id = fbs_id;
	}
	String getCompanyName() {
		return CompanyName;
	}
	void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	String getDesignation() {
		return designation;
	}
	void setDesignation(String designation) {
		this.designation = designation;
	}
	double getDistance_Traveled() {
		return distance_Traveled;
	}
	void setDistance_Traveled(double distance_Traveled) {
		this.distance_Traveled = distance_Traveled;
	}
	
	void display()
	  {
		super.display();
	  System.out.println("FBS_ID " + fbs_id);
	  System.out.println("NAME " + name);
	  System.out.println("Distance " + distance_Traveled);
	  System.out.println("COUNT " + count);
	  }

}



class Test {
            public static void main (String [] args)
           {
                //Student s1 = new Student();
                Student s1 = new Student(1,"ABC",25.5,2);
                PlacedStudent ps1 = new PlacedStudent(1,"unknown", "devloper",5);
               s1.display();
                
           }


     
}