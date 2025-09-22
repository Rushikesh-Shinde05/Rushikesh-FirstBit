
class Student {
 int id;
 String name;
 Student(int id, String name) {
	super();
	this.id = id;
	this.name = name;
 }
 int getId() {
	return id;
 }
 void setId(int id) {
	this.id = id;
 }
 String getName() {
	return name;
 }
 void setName(String name) {
	this.name = name;
 }
 void display() {
	 System.out.println("ID of Student:" +id);
	 System.out.println("Name of Student:" +name);
 }
}//Student class ends here

class  UndergraduateStudent extends Student 
{
	int year;
	String major;
	UndergraduateStudent(int id, String name, int year, String major) {
		super(id, name);
		this.year = year;
		this.major = major;
	}
	int getYear() {
		return year;
	}
	void setYear(int year) {
		this.year = year;
	}
	String getMajor() {
		return major;
	}
	void setMajor(String major) {
		this.major = major;
	} 
	void display() {
		super.display();
		System.out.println("Year of Student:" +year);
		System.out.println("Major of Student:" +major);
	}
}// UndergraduateStudent class ends here

class  PostgraduateStudent extends Student 
{
	String  researchTopic;
	String  guid;
	PostgraduateStudent(int id, String name, String researchTopic, String guid) {
		super(id, name);
		this.researchTopic = researchTopic;
		this.guid = guid;
	}
	String getResearchTopic() {
		return researchTopic;
	}
	void setResearchTopic(String researchTopic) {
		this.researchTopic = researchTopic;
	}
	String getGuid() {
		return guid;
	}
	void setGuid(String guid) {
		this.guid = guid;
	}
	void display() {
		super.display();
		System.out.println("Name of  researchTopic is:" + researchTopic);
		System.out.println("Name of guid:" +guid);
	}
} //PostGraduate class ends here

class PhdStudent extends PostgraduateStudent 
{
	   String thesisTitle;
	   int Publication;
	   PhdStudent(int id, String name, String researchTopic, String guid, String thesisTitle, int publication) {
		super(id, name, researchTopic, guid);
		this.thesisTitle = thesisTitle;
		Publication = publication;
	   }
	   String getThesisTitle() {
		   return thesisTitle;
	   }
	   void setThesisTitle(String thesisTitle) {
		   this.thesisTitle = thesisTitle;
	   }
	   int getPublication() {
		   return Publication;
	   }
	   void setPublication(int publication) {
		   Publication = publication;
	   }
	void display() {
		super.display();
		
		System.out.println("thesisTitle name:" +thesisTitle);
		System.out.println("Numbers of publications:" +Publication);
	}
}// PhdStudent class ends here

class Test{
	public static void main(String [] args) {
		Student s1 = new Student(1, "jhon doe");
		Student s2 = new UndergraduateStudent(2,"Ram", 1, "Computer science");
		Student s3 = new PostgraduateStudent(3, "Pratham", "web dev", "abc");
		Student s4  = new PhdStudent(4, "Rushikesh", "AI", "XYZ", "Era of Ai", 5);
		
		s1.display();
		s2.display();
		s3.display();
		s4.display();
	}
}
