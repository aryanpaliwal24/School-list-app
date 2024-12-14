import mysql from "mysql2/promise";

let connection;

export const createConnection = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Aryan@5624",
        database: "school",
        port: "3306",
      });
      await connection.execute("SELECT 1");
      
      console.log("Database connected successfully");
    }
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Database connection failed");
  }
};
