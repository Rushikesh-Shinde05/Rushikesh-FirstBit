
class Machine {

        double Weight;

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

} // machine class ends here

class Vehicle extends Machine
{
	String FuelType;
	double Speed;
    
	Vehicle(double weight, String fuelType, double speed) {
		super(weight);
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
		super.display();
		System.out.println("FuleType of Vehicle is " +FuelType);
		System.out.println("Speed of Vehicle is "+Speed); 
	   }
	
	
} //Vehicle class ends here

class Car extends Vehicle
{
	 int Wheels;
	 int Seats;
	 String Brand;
	 Car(double weight, String fuelType, double speed, int wheels, int seats, String brand) {
		super(weight, fuelType, speed);
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
	 
} // Car class ends here

class ElectricCar extends Car
{
	double BatteryCapacity;
	double chargingTime;
	String ecoFriendly;
	ElectricCar(double weight, String fuelType, double speed, int wheels, int seats, String brand,
			double batteryCapacity, double chargingTime, String ecoFriendly) {
		super(weight, fuelType, speed, wheels, seats, brand);
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
} //electricCar class ends here

class Test{
	public static void main(String[] args) 
	{
		Machine m1 = new Machine(800);
		Vehicle v1 = new Vehicle(800, "Ethanol", 350);
		Car c1 = new Car(800, "Ethanol", 350, 4, 1, "Mercedes Petronas");
		ElectricCar ec1 = new ElectricCar(800, "EV", 397, 4, 1, "Mercedes Petronas", 38.5, 30, "yes");
		m1.display();
		v1.display();
		c1.display();
		ec1.display();
		
	}
} // Test class ends here


