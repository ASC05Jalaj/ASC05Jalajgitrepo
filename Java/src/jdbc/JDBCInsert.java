package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCInsert {
    public static void main(String[] args) {
        try {
            System.out.println("1. Establishing a connection to the database.");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb1","root","mysql");
            System.out.println("2. Create the statement.");
            Statement statement = connection.createStatement();
            System.out.println("3. Execute the query.");
            int noOfRowsAffected = statement.executeUpdate("INSERT INTO USER (USER_ID, EMAIL, FIRST_NAME, LAST_NAME) VALUES (6, 'USER6@M.COM', 'JANE1', 'DOEY1');");
            System.out.println("4. Process the status.");

            if(noOfRowsAffected > 0)
                System.out.println(noOfRowsAffected + " Record inserted successfully.");
            else
                System.out.println("Record not inserted successfully.");

        } catch (SQLException exception) {
            System.out.println("Error: Could not connect to the database." + exception.getMessage());
        }
    }
}