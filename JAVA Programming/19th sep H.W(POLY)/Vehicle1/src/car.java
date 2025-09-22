

class Vehicle 
{
	String FuelType;
	double Speed;
    
	Vehicle(String fuelType, double speed) {
		
		FuelType = fuelType;
		Speed = speed;
	}

	String getFuelType() {
		return FuelType;
	}

	void setFuelType(String fuelType) {
		FuelType = fuelType;
	}

	double getSpeed() {
		return Speed;
	}

	void setSpeed(double speed) {
		Speed = speed;
	}

	public void display() {
		
		System.out.println("FuleType of Vehicle is " +FuelType);
		System.out.println("Speed of Vehicle is "+Speed); 
	   }

	public void breake() {
		// TODO Auto-generated method stub
		
	}
	
	
} //Vehicle class ends here

class Car extends Vehicle
{
	 int Wheels;
	 int Seats;
	 String Brand;
	 Car( String fuelType, double speed, int wheels, int seats, String brand) {
		super( fuelType, speed);
		Wheels = wheels;
		Seats = seats;
		Brand = brand;
	 }
	 int getWheels() {
		 return Wheels;
	 }
	 void setWheels(int wheels) {
		 Wheels = wheels;
	 }
	 int getSeats() {
		 return Seats;
	 }
	 void setSeats(int seats) {
		 Seats = seats;
	 }
	 String getBrand() {
		 return Brand;
	 }
	 void setBrand(String brand) {
		 Brand = brand;
	 }
	public void display() {
		super.display();
		System.out.println("Wheels of car is " +Wheels);
		System.out.println("Seats are available in car is "+Seats);
		System.out.println("Brand of Car is " +Brand);
	}
	public void breake() {
		System.out.println("break is working Properly");
	}
	 
} // Car class ends here

class ElectricCar extends Car
{
	double BatteryCapacity;
	double chargingTime;
	String ecoFriendly;
	ElectricCar( String fuelType, double speed, int wheels, int seats, String brand,
			double batteryCapacity, double chargingTime, String ecoFriendly) {
		super( fuelType, speed, wheels, seats, brand);
		BatteryCapacity = batteryCapacity;
		this.chargingTime = chargingTime;
		this.ecoFriendly = ecoFriendly;
	}
	double getBatteryCapacity() {
		return BatteryCapacity;
	}
	void setBatteryCapacity(double batteryCapacity) {
		BatteryCapacity = batteryCapacity;
	}
	double getChargingTime() {
		return chargingTime;
	}
	void setChargingTime(double chargingTime) {
		this.chargingTime = chargingTime;
	}
	String getEcoFriendly() {
		return ecoFriendly;
	}
	void setEcoFriendly(String ecoFriendly) {
		this.ecoFriendly = ecoFriendly;
	}
	public void display() {
		super.display();
		System.out.println("Battery Capacity is " +BatteryCapacity );
		System.out.println("Chargiing time of car is " +chargingTime);
		System.out.println("is Car Eco__Friendly " +ecoFriendly);
	}
	public void breake() {
		System.out.println("break is working Properly");
	}
} //electricCar class ends here

class Test{
	public static void main(String[] args) 
	{
		
		Vehicle v1 = new Vehicle( "Ethanol", 350);
		Vehicle v2 = new Car( "Ethanol", 350, 4, 1, "Mercedes Petronas");
		Vehicle v3 = new ElectricCar( "EV", 397, 4, 1, "Mercedes Petronas", 38.5, 30, "yes");
		v1.breake();
		v1.display();
		v2.display();
		v3.display();
		
	}
} // Test class ends here


