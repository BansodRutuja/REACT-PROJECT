// Connecting customers file to database.
const myDBconnection = require('./dbconnection');

//----------------------------------------------------READ OPERATION-------------------------------------------------------->
const getALLCustomersFromDB = async () => {
  try {
    let connection = await myDBconnection();
    const [rows] = await connection.execute("SELECT * FROM myerpdb.CUSTOMER");
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//----------------------------------------------------READ OPERATION ENDS-------------------------------------------------------->

//----------------------------------------------------READ SPECIFIC DATA OPERATION-------------------------------------------------------->
const getCustomersFromDB = async () => {
  try {
    let connection = await myDBconnection();
    const [rows] = await connection.execute("SELECT * FROM myerpdb.CUSTOMER WHERE CUSTOMER_name LIKE '%ab%'");
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//----------------------------------------------------READ SPECIFIC OPERATION ENDS-------------------------------------------------------->

//----------------------------------------------------INSERT OPERATION START-------------------------------------------------------->
const insertCustomerToDB = async (name, address, mobile, email, gst) => {
  try {
    let connection = await myDBconnection();
    const query = "INSERT INTO myerpdb.CUSTOMER(CUSTOMER_name, CUSTOMER_address, CUSTOMER_mobile, CUSTOMER_email, CUSTOMER_gst) VALUES (?, ?, ?, ?, ?)";
    // Ensure no undefined values are passed
    const params = [
      name ?? null,
      address ?? null,
      mobile ?? null,
      email ?? null,
      gst ?? null,
    ];
    // Execute the query
    const [result] = await connection.execute(query, params);
    console.log("Insert Result:", result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//----------------------------------------------------INSERT OPERATION ENDS-------------------------------------------------------->

//----------------------------------------------------UPDATE OPERATION STARTS-------------------------------------------------------->
const updateCustomerToDB = async (id, name, address, mobile, email, gst, cutom_freuquency) => {
  try {
    if (id === undefined) {
      throw new Error("Customer ID is required for updating.");
    }

    let connection = await myDBconnection();
    const query = "UPDATE myerpdb.customer SET CUSTOMER_name=?, CUSTOMER_address=?, CUSTOMER_mobile=?, CUSTOMER_email=?, CUSTOMER_gst=?, cutom_freuquency=? WHERE CUSTOMER_ID=?";

    // Ensure no undefined values are passed
    const params = [
      name ?? null,
      address ?? null,
      mobile ?? null,
      email ?? null,
      gst ?? null,
      cutom_freuquency ?? null,
      id,
    ];

    const [result] = await connection.execute(query, params);
    console.log("Update Result:", result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//----------------------------------------------------UPDATE OPERATION ENDS-------------------------------------------------------->

//<-----------------------------------------------DELETE OPERATION START------------------------------------------------------------->
const deleteCustomerToDB = async (id) => {
  try {
    if (id === undefined) {
      throw new Error("Customer ID is required for deletion.");
    }

    let connection = await myDBconnection();
    const query = "DELETE FROM myerpdb.customer WHERE CUSTOMER_ID=?";

    const [result] = await connection.execute(query, [id]);
    console.log("Delete Result:", result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//-----------------------------------------------DELETE OPERATION ENDS--------------------------------------->

//                  <------------------EXPORTING ALL METHODS------------->
module.exports = {
  getALLCustomersFromDB,
  getCustomersFromDB,
  insertCustomerToDB,
  updateCustomerToDB,
  deleteCustomerToDB,
};
