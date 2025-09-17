class ElectricityBill
{
	int b_id;
	String name;
	int unit;
	static double rateperunit;
	static
	{
		rateperunit=100;
	}
	ElectricityBill()
	{
		this.b_id=101;
		this.name="spiderman";
		this.unit=80;
		System.out.println("Default constructor:");
	}
	ElectricityBill(int i,String n,int u)
	{
		this.b_id=i;
		this.name=n;
		this.unit=u;
	System.out.println("parameter constructor:");

	}
	void cId(int i)
	{
		this.b_id=i;
	}
	void cName(String n)
	{
		this.name=n;
	}
	void cUnit(int u)
	{
		this.unit=u;
	}
	static void getratePerUnit(int r)
	{
		rateperunit=r;
	}
	int getCid()
	{
		return b_id;
	}
	String getcName()
	{
		return name;
	}
	int getUnit()
	{
		return unit;
	}
	double getratePerUniit()
	{
		return rateperunit;
	}
	void calculateBill()
	{
		System.out.println("Calculate Bill");
		System.out.println("Customer id:"+this.b_id);
		System.out.println("Customer Name:"+this.name);
		System.out.println("Customer Unit:"+this.unit);
		System.out.println("Customer rateperunit:"+this.rateperunit);
		System.out.println("Your Total Electricity bill is :"+this.unit*this.rateperunit+"\n");
	}

}
class Test
{
	public static void main(String [] a)
	{
		ElectricityBill e1=new ElectricityBill (201,"unknown",80);
		
		e1.calculateBill();
		
		ElectricityBill e2=new ElectricityBill (301,"jhon Doe",70);
		e2.calculateBill();
	
		e1.getratePerUnit(15);
		e1.calculateBill();
		e2.calculateBill();


	}
}

		
