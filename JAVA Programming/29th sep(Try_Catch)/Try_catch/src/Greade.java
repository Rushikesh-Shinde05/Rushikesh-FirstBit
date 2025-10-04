class Grade {
  double Marks;

public Grade(double Marks)  {
	this.Marks=Marks;
	try {
		System.out.println("Try Bloc Started");
		if(this.Marks <0 || this.Marks>100 ) {
			throw new Exception("Invalid Marks! Must BE IN 0 TO 100");
		}
		if (Marks <80){
			System.out.println("You Got A Grade");
		}
		if(Marks <70) {
			System.out.println("You Got B Grade");
		}
		if(Marks<50) {
			System.out.println("You Got C Grade");
		}
		if(Marks <35) {
			System.out.println("You Passed");
		}
		else {
			System.out.println("You Fali");
		}
	}
		catch( Exception e ) {
			System.out.println("Cathc block");
			System.out.println(e);
		}
		finally {
			System.out.println("Finally block excuted");
		}
	System.out.println("Outer Try Block Excuted Succesfully");
 
	}
  

} // Grade class ends here

public class Greade {
	public static void main (String [] args) {
		Grade g1 = new Grade(99); 
		
	     System.out.println("\nCase 2: Invalid marks");
	        Grade g2 = new Grade(120);
	}
}
