const express = require('express');
const myapplication = express();
const port = 3008;
const cors = require('cors');
myapplication.use(cors());
const bodyParser = require('body-parser');
myapplication.use(bodyParser.json());

// Import customer and user2 operations
const {
  getALLCustomersFromDB,
  getCustomersFromDB,
  insertCustomerToDB,
  updateCustomerToDB,
  deleteCustomerToDB,
} = require('./customers.js');

const {
  getALLUser2FromDB,
  getUser2FromDB,
  insertUser2ToDB,
  updateUser2ToDB,
  deleteUser2ToDB,
} = require('./user2.js');

//----------------------------DELETE() METHOD FOR CUSTOMER----------------------------------->
myapplication.delete('/api/customers', async (req, res) => {
  console.log('Request received to delete the customer');
  console.log(req.body);

  try {
    // Ensure the CUSTOMER_ID is provided
    const { CUSTOMER_ID } = req.body;
    if (!CUSTOMER_ID) {
      return res.status(400).send('Customer ID is required for deletion.');
    }

    // Call the delete function
    await deleteCustomerToDB(CUSTOMER_ID);

    res.status(200).send('Customer deleted successfully.');
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------DELETE() METHOD FOR CUSTOMER "ENDS"---------------------------->

//----------------------------PATCH() METHOD FOR CUSTOMER------------------------------------->
myapplication.patch('/api/customers', async (req, res) => {
  console.log('Request received to update the customer');
  console.log(req.body);

  try {
    const {
      CUSTOMER_ID,
      CUSTOMER_name,
      CUSTOMER_address,
      CUSTOMER_mobile,
      CUSTOMER_email,
      CUSTOMER_gst,
      custom_frequency,
    } = req.body;

    // Check for required parameters
    if (!CUSTOMER_ID || !CUSTOMER_name) {
      return res.status(400).send('Required parameters are missing.');
    }

    // Call the update function
    await updateCustomerToDB(
      CUSTOMER_ID,
      CUSTOMER_name,
      CUSTOMER_address,
      CUSTOMER_mobile,
      CUSTOMER_email,
      CUSTOMER_gst,
      custom_frequency
    );

    res.status(200).send('Customer updated successfully.');
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------PATCH() METHOD FOR CUSTOMER "ENDS"--------------------------->

//----------------------------POST() METHOD FOR CUSTOMER----------------------------------->
myapplication.post('/api/customers', async (req, res) => {
  console.log('Request received to add a customer');
  console.log(req.body);

  try {
    const {
      CUSTOMER_name,
      CUSTOMER_address,
      CUSTOMER_mobile,
      CUSTOMER_email,
      CUSTOMER_gst,
    } = req.body;

    // Call the insert function
    await insertCustomerToDB(
      CUSTOMER_name,
      CUSTOMER_address,
      CUSTOMER_mobile,
      CUSTOMER_email,
      CUSTOMER_gst
    );

    res.status(201).send('Customer added successfully.');
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------POST() METHOD FOR CUSTOMER "ENDS"--------------------------->

//----------------------------GET() METHOD FOR CUSTOMER----------------------------------->
myapplication.get('/api/customers', async (req, res) => {
  console.log('Request received to get the list of customers');

  try {
    const name = req.query.name;
    let data;

    if (name) {
      data = await getCustomersFromDB(name); // Pass the name to the function
    } else {
      data = await getALLCustomersFromDB();
    }

    console.log('Query name:', name);
    console.log('Data returned:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------GET() METHOD FOR CUSTOMER "ENDS"------------------------->

//----------------------------GET() METHOD FOR USERS----------------------------------->
myapplication.get('/api/user2', async (req, res) => {
  console.log('Request received to get the list of users');

  try {
    const name = req.query.name;
    let data;

    if (name) {
      data = await getUser2FromDB(name);
    } else {
      data = await getALLUser2FromDB();
    }

    console.log('Query name:', name);
    console.log('Data returned:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------GET() METHOD FOR USERS "ENDS"---------------------------->

//----------------------------POST() METHOD FOR USER2----------------------------------->
myapplication.post('/api/user2', async (req, res) => {
  console.log('Request received to add a user');
  console.log(req.body);

  try {
    const { user2_name, user2_address, user2_mobile, user2_email } = req.body;

    // Call the insert function
    await insertUser2ToDB(
      user2_name,
      user2_address,
      user2_mobile,
      user2_email
    );

    res.status(201).send('User added successfully.');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------POST() METHOD FOR USER2 "ENDS"----------------------------------->

//----------------------------PATCH() METHOD FOR USER2----------------------------------------->
myapplication.patch('/api/user2', async (req, res) => {
  console.log('Request received to update the user');
  console.log(req.body);

  try {
    const { user2_ID, user2_name, user2_address, user2_mobile, user2_email } =
      req.body;

    // Check for required parameters
    if (!user2_ID) {
      return res.status(400).send('User ID is required for updating.');
    }

    // Call the update function
    await updateUser2ToDB(
      user2_ID,
      user2_name,
      user2_address,
      user2_mobile,
      user2_email
    );

    res.status(200).send('User updated successfully.');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------PATCH() METHOD FOR USER2 "ENDS"------------------------------>

//----------------------------DELETE() METHOD FOR USER2----------------------------------->
myapplication.delete('/api/user2', async (req, res) => {
  console.log('Request received to delete the user');
  console.log(req.body);

  try {
    const { user2_ID } = req.body;

    if (!user2_ID) {
      return res.status(400).send('User ID is required for deletion.');
    }

    // Call the delete function
    await deleteUser2ToDB(user2_ID);

    res.status(200).send('User deleted successfully.');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Some error occurred: ' + error.message);
  }
});
//----------------------------DELETE() METHOD FOR USER2 "ENDS"---------------------------->

//<----------------------------Starting the Server------------------------------------------------>

myapplication.listen(port, () => {
  console.log('My server has started on port ' + port);
});
