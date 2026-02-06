class Student {
    int RollNo;
    String Name;
    
    void setrollno(int rollno){
        this.RollNo = rollno;
    }
    int getrollno(){
        return RollNo;
    }
    
    void setname(String name){
        this.Name = name;
    }
    
    String getname(){
        return Name;
    }
    
    public static  void main(String args[]){
        Student s = new Student();
        s.setrollno(1);
        s.setname("XYZ");
        System.out.println("RollNo:" + s.getrollno());
        System.out.println("Name" + s.getname());
    }
}