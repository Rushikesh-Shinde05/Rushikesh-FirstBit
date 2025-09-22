
class ElectricityBill {

	int b_id;
	String name;
	int unit;
    double rateperunit;
	ElectricityBill(int b_id, String name, int unit, double rateperunit) {
		super();
		this.b_id = b_id;
		this.name = name;
		this.unit = unit;
		this.rateperunit = rateperunit;
	}
	int getB_id() {
		return b_id;
	}
	void setB_id(int b_id) {
		this.b_id = b_id;
	}
	String getName() {
		return name;
	}
	void setName(String name) {
		this.name = name;
	}
	int getUnit() {
		return unit;
	}
	void setUnit(int unit) {
		this.unit = unit;
	}
	double getRateperunit() {
		return rateperunit;
	}
	void setRateperunit(double rateperunit) {
		this.rateperunit = rateperunit;
	}
	
	void display() {
		
		
		System.out.println("Billing Id:" +b_id);
		System.out.println("Name:"+name);
		System.out.println("Unit:"+unit);
		System.out.println("rateperunit:" +rateperunit);
	}
}// Electricity Class end here


class Commercial extends ElectricityBill 
{

	double surCharge;
	double otherCharges;
	Commercial(int b_id, String name, int unit, double rateperunit, double surCharge, double otherCharges) {
		super(b_id, name, unit, rateperunit);
		this.surCharge = surCharge;
		this.otherCharges = otherCharges;
	}
	double getSurCharge() {
		return surCharge;
	}
	void setSurCharge(double surCharge) {
		this.surCharge = surCharge;
	}
	double getOtherCharges() {
		return otherCharges;
	}
	void setOtherCharges(double otherCharges) {
		this.otherCharges = otherCharges;
	}
	
	void display() {
		super.display();
		System.out.println("Your SureCharge:" +surCharge);
		System.out.println("Your Other Charges:"+otherCharges);
	}
	
}//Commercial class ends here

class DomesticBill extends ElectricityBill 
{
	double  Discount;
	double Tax;
	DomesticBill(int b_id, String name, int unit, double rateperunit, double discount, double tax) {
		super(b_id, name, unit, rateperunit);
		Discount = discount;
		Tax = tax;
	}
	double getDiscount() {
		return Discount;
	}
	void setDiscount(double discount) {
		Discount = discount;
	}
	double getTax() {
		return Tax;
	}
	void setTax(double tax) {
		Tax = tax;
	}
	
	void display() {
		super.display();
		
		System.out.println("Discount:" +Discount);
		System.out.println("Tax:"+Tax);
	}
		
}//Domestic Bill class ends here


class Test{
	public static void main (String [] args) {
		
		ElectricityBill e1 = new ElectricityBill(1, "jhon doe", 50, 7);
		e1.display();
		
		Commercial c1 = new Commercial(2, "Abc", 60, 7, 20, 10);
		c1.display();
		
		DomesticBill d1 = new DomesticBill(3, "xyz", 70, 7, 20, 10);
		d1.display();
	}
}