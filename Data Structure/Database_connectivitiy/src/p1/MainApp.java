package p1;
import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;
public class MainApp {
 
	public static void main(String[] args) {
		String emp_id;
		 String first_name;
		 String last_name;

   //Step 1 Load The Driver
		try {
			Scanner sc = new Scanner(System.in);
			System.out.println("Enter Employee ID:");
			emp_id = sc.nextLine();
			
			System.out.println("Enter Employee FirstNAME :");
			first_name = sc.nextLine();
			
			System.out.println("Enter Employee  LastNAME :");
			last_name = sc.nextLine();
			Class.forName("com.mysql.cj.jdbc.Driver");
			//Protocol: Sub-protocol: DB -specific information
			//jdbc:Oracle:
			Connection con = DriverManager.getConnection(
				    "jdbc:mysql://localhost:3306/assignment3?useSSL=false&serverTimezone=UTC",
				    "root",
				    "shinde@0513"
				);

					//String query="Select * From  department";
					String query="INSERT INTO employee(emp_id ,first_name,last_name) values(?,?,?)";
					
			//Statement stmt = con.createStatement();
					PreparedStatement pstmt=con.prepareStatement(query);
			//ResultSet rs=stmt.executeQuery(query);
				pstmt.setString(1, emp_id);
				pstmt.setString(2,first_name);
				pstmt.setString(3, last_name);

				int UpdateRowCount=pstmt.executeUpdate();
				System.out.println(UpdateRowCount);
				
			//System.out.println("DEPT_ID | DEPT_NAME    | MAG_ID | Loc");

//			while(rs.next()) {
//				System.out.println(
//						rs.getInt(1) + "      |" +
//						rs.getString(2) + "|   " +
//						rs.getInt(3) + "  |" +
//						rs.getInt(4) 
//								);
//						}
			con.close();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}  //com.mysql.cj.jdbc.Driver
		
	}

}
