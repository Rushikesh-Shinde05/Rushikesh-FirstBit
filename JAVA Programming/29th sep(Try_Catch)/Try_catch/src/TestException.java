
class VoterAgeException extends Exception{
	@override
public String toString() {
		return "Invalid Age!";
		}
}

class Voter{
	int age;
	public Voter(int age) {
		this.age=age;
	}
	public void Validate() {
		try {
			if (this.age<18) {
				throw new  VoterAgeException();
			}
			else
			{
				System.out.println("Yes you can vote");
			}
		} //Try block ends here
		catch (VoterAgeException ve )
		{
		System.out.println(ve); 
		}
	}//Validation ends here
} //Voter class ends here

public class TestException {
	public static void main (String[] args) {
		Voter v1=new Voter(23);
		v1.Validate();
	}
}
