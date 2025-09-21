class Machine 
{     double Weight;

Machine(double weight) {
	super();
	Weight = weight;
}

double getWeight() {
	return Weight;
}

void setWeight(double weight) {
	Weight = weight;
}
public void display() {
	System.out.println("Weight of machine :" + Weight);
}
}//Machine class ends here

class ElectronicDevice extends Machine
{
    String Brand;
    double PowerSource;
	ElectronicDevice(String brand, double powerSource) {
		super(powerSource);
		Brand = brand;
		PowerSource = powerSource;
	}
	String getBrand() {
		return Brand;
	}
	void setBrand(String brand) {
		Brand = brand;
	}
	double getPowerSource() {
		return PowerSource;
	}
	void setPowerSource(double powerSource) {
		PowerSource = powerSource;
	}
    
    public void display()
    {
    	System.out.println("Brand is :" +Brand);
    	System.out.println("Power Source is :" + PowerSource);
    }
    
} //ElectronicDevice class ends here


class Computer extends ElectronicDevice
{
	  int Ram;
	  String Processor;
	
	  Computer(String brand, double powerSource, int ram, String processor) {
		super(brand, powerSource);
		Ram = ram;
		Processor = processor;
	}
	  int getRam() {
		  return Ram;
	  }
	  void setRam(int ram) {
		  Ram = ram;
	  }
	  String getProcessor() {
		  return Processor;
	  }
	  void setProcessor(String processor) {
		  Processor = processor;
	  }
	  
	  public void display()
	  {
		  System.out.println("Ram is :" +Ram);
		  System.out.println("Processor is :" +Processor);
	  }
} //Computer class  ends here


class Laptop extends Computer
{
	double ScreenSize;
	double batteryLife;

	Laptop(String brand, double powerSource, int ram, String processor, double screenSize, double batteryLife) {
		super(brand, powerSource, ram, processor);
		ScreenSize = screenSize;
		this.batteryLife = batteryLife;
	}
	double getScreenSize() {
		return ScreenSize;
	}
	void setScreenSize(double screenSize) {
		ScreenSize = screenSize;
	}
	double getBatteryLife() {
		return batteryLife;
	}
	void setBatteryLife(double batteryLife) {
		this.batteryLife = batteryLife;
	}
	
	public void display()
	{
		System.out.println("Screen Size of laptop is :" +ScreenSize);
		System.out.println("Battery Life of Laptop is :" +batteryLife);
	}
} //Laptop class ends here

class GamingLaptop extends Laptop
{
	int Gpu;
	int refreshRate;

	GamingLaptop(String brand, double powerSource, int ram, String processor, double screenSize, double batteryLife,
			int gpu, int refreshRate) {
		super(brand, powerSource, ram, processor, screenSize, batteryLife);
		Gpu = gpu;
		this.refreshRate = refreshRate;
	}
	int getGpu() {
		return Gpu;
	}
	void setGpu(int gpu) {
		Gpu = gpu;
	}
	int getRefreshRate() {
		return refreshRate;
	}
	void setRefreshRate(int refreshRate) {
		this.refreshRate = refreshRate;
	}
	
	public void display()
	{
		System.out.println("GPU of Gaming Laptop is :" +Gpu);
		System.out.println("Refrash Rate of Gaming Laptop is :" +refreshRate);
	}
} //GamingLaptop

class VRGamingLaptop extends GamingLaptop
{
	String VRGamingSupport;
	String MotionSensors;
	
	VRGamingLaptop(String brand, double powerSource, int ram, String processor, double screenSize, double batteryLife,
			int gpu, int refreshRate, String vRGamingSupport, String motionSensors) {
		super(brand, powerSource, ram, processor, screenSize, batteryLife, gpu, refreshRate);
		VRGamingSupport = vRGamingSupport;
		MotionSensors = motionSensors;
	}
	String getVRGamingSupport() {
		return VRGamingSupport;
	}
	void setVRGamingSupport(String vRGamingSupport) {
		VRGamingSupport = vRGamingSupport;
	}
	String getMotionSensors() {
		return MotionSensors;
	}
	void setMotionSensors(String motionSensors) {
		MotionSensors = motionSensors;
	}
	
	public void display()
	{
		System.out.println("Is Laptop Supporsts VR Gaming :" +VRGamingSupport);
		System.out.println("Does Laptop have Motion Sensors:" +MotionSensors);
	}
} //VRGamingLaptop class end here


class Test
{
	public static void main (String [] args)
	{
		Machine m1 = new Machine(2.5);
		ElectronicDevice ed1 = new ElectronicDevice("Asus", 5000);
		Computer c1 = new Computer("Asus", 5000, 64, "i9");
		Laptop   l1 = new Laptop("Asus", 5000, 64, "i9", 16, 5);
		GamingLaptop gl1 = new GamingLaptop("Asus", 5000, 64, "i9", 16, 5, 5090, 144);
		VRGamingLaptop vrl1 = new VRGamingLaptop("Asus", 5000, 64,"i9", 16, 5, 5090, 144, "Yes", "Yes");
		
		m1.display();
		ed1.display();
		c1.display();
		l1.display();
		gl1.display();
		vrl1.display();
	}
	
} // Test class ends here