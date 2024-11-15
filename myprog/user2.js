// connecting users file to the database.
const myDBconnection = require('./dbconnection');

// <-----------------------------------------READ OPERATION ------------------------------------------>
const getALLUser2FromDB = async () => {
  try {
    let connection = await myDBconnection();
    const [rows] = await connection.execute('SELECT * FROM myerpdb.user2');
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// <-----------------------------------------READ OPERATION "ENDS"------------------------------------>

//------------------------------------------READ SPECIFIC DATA OPERATION----------------------------->
const getUser2FromDB = async (name) => {
  try {
    let connection = await myDBconnection();
    const [rows] = await connection.execute(
      'SELECT * FROM myerpdb.user2 WHERE user2_name like ?',
      [`%${name}%`]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//--------------------------------------------READ SPECIFIC OPERATION ENDS------------------------------>

//--------------------------------------------INSERT OPERATION START---------------------------->
const insertUser2ToDB = async (name, address, mobile, email) => {
  try {
    let connection = await myDBconnection();
    const query =
      'INSERT INTO myerpdb.user2(user2_name,user2_address,user2_mobile,user2_email)VALUES (?,?,?,?)';
    // execute the query
    const [result] = await connection.execute(query, [
      name,
      address,
      mobile,
      email,
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//----------------------------------------------INSERT OPERATION ENDS------------------------------->

//---------------------------------------------UPDATE OPERATION STARTS------------------------------>
const updateUser2ToDB = async (id, name, address, mobile, email) => {
  try {
    let connection = await myDBconnection();
    const query =
      'UPDATE myerpdb.user2 SET user2_name=?,user2_address=?, user2_mobile=?,user2_email=?  where user2_ID=?';

    const [result] = await connection.execute(query, [
      name,
      address,
      mobile,
      email,
      id,
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//--------------------------------------------UPDATE OPERATION ENDS--------------------------->

//--------------------------------------------DELETE OPERATION START-------------------------->
const deleteUser2ToDB = async (id) => {
  try {
    let connection = await myDBconnection();
    const query = 'DELETE FROM myerpdb.user2 where user2_ID=?';

    const [result] = await connection.execute(query, [id]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//--------------------------------------------DELETE OPERATION ENDS---------------------------->

//<-------------------------------------------EXPORTING USER2 FUNCTION--------------------------------->
module.exports = {
  getALLUser2FromDB,
  getUser2FromDB,
  insertUser2ToDB,
  updateUser2ToDB,
  deleteUser2ToDB,
};
