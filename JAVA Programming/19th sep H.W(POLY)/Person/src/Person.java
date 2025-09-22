
class Person {
       String name;
       int age;
	   Person(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	   }
	   String getName() {
		   return name;
	   }
	   void setName(String name) {
		   this.name = name;
	   }
	   int getAge() {
		   return age;
	   }
	   void setAge(int age) {
		   this.age = age;
	   }
	   void display() {
		   System.out.println("Name of person:" +name);
		   System.out.println("Age of person:" +age);
	   }
	   
} // Person class ends here

class Student extends Person
{
	int RollN;

	

	Student(String name, int age, int rollN) {
		super(name, age);
		RollN = rollN;
	}

	int getRollN() {
		return RollN;
	}

	void setRollN(int rollN) {
		RollN = rollN;
	}
	void display() {
		super.display();
		System.out.println("Roll Number of Student:" +RollN);
	}
}//Student class end here

class  Teacher extends Person 
{
	String Subject;

	Teacher(String name, int age, String subject) {
		super(name, age);
		Subject = subject;
	}

	String getSubject() {
		return Subject;
	}

	void setSubject(String subject) {
		Subject = subject;
	}
	void display() {
		super.display();
		
		System.out.println("Subject:" +Subject);
	}
}//Teacher class ends here

class Principal extends Teacher 
{
	int yearsOfExperience;

	Principal(String name, int age, String subject, int yearsOfExperience) {
		super(name, age, subject);
		this.yearsOfExperience = yearsOfExperience;
	}

	int getYearsOfExperience() {
		return yearsOfExperience;
	}

	void setYearsOfExperience(int yearsOfExperience) {
		this.yearsOfExperience = yearsOfExperience;
	}
	void display() {
           super.display();
           System.out.println("Years of Experience:" +yearsOfExperience);
		}
}//Principal class ends here

class Test{
	public static void main (String [] args) {
		Person p1 =new Person("Jhon Doe", 20);
		p1.display();
		
		Person p2 = new Student("PQR", 20, 1);
		p2.display();
		
		Person p3 = new Teacher("ABC", 27, "MYSQL");
		p3.display();
		
		Person p4 = new Principal("XYZ", 50, "Java", 25);
		p4.display();
	}
}
