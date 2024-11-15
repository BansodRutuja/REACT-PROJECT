import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customer.css';

const Customer = () => {
    const [customer, setCustomer] = useState([]); // State to hold all customers
    const [name, setName] = useState(""); // State to hold the new customer's name
    const [address, setAddress] = useState(""); // State to hold the new customer's address
    const [mobile, setMobile] = useState(""); // State to hold the new customer's mobile
    const [email, setEmail] = useState(""); // State to hold the new customer's email
    const [gst, setGst] = useState(""); // State to hold the new customer's GST
    const [editingCustomerId, setEditingCustomerId] = useState(null); // State to hold the ID of the customer being edited
    const [formMode, setFormMode] = useState("add"); // State to hold the current form mode (add/edit)
    
    //<---------------------------------GET Method------------------------------------>
    // Function to fetch all customers from the backend
    const getCustomer = () => {
        axios.get('http://localhost:3008/api/customers')
            .then(response => {
                setCustomer(response.data); // Update the customer state with the data from the backend
            })
            .catch(error => {
                console.error('Error fetching customers:', error); // Log any errors that occur
            });
    };

    //<---------------------------------DELETE Method-------------------------------->
    // Function to delete a customer by ID
    const deleteCustomer = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) { // Confirm deletion
            axios.delete(`http://localhost:3008/api/customers`, { data: { CUSTOMER_ID: id } })
                .then(() => {
                    alert("Customer deleted successfully"); // Notify the user of successful deletion
                    getCustomer(); // Refresh the customer list
                })
                .catch(error => {
                    console.error('Error deleting customer:', error); // Log any errors that occur
                });
        }
    };

    //<---------------------------------POST Method----------------------------------->
    // Function to add a new customer
    const addNewCustomer = () => {
        // Validate the form fields
        if (!name || !address || !mobile || !email || !gst) {
            alert('Please fill in all fields');
            return;
        }

        const payload = {
            CUSTOMER_name: name,
            CUSTOMER_address: address,
            CUSTOMER_mobile: mobile,
            CUSTOMER_email: email,
            CUSTOMER_gst: gst
        };

        axios.post('http://localhost:3008/api/customers', payload) // Send a POST request to add the new customer
            .then(() => {
                alert("Customer added successfully"); // Notify the user of successful addition
                getCustomer(); // Refresh the customer list
                clearForm(); // Clear the form fields
            })
            .catch(error => {
                console.error('Error adding customer:', error); // Log any errors that occur
            });
    };

    //<---------------------------------PATCH Method---------------------------------->
    // Function to update an existing customer
    const updateCustomer = () => {
        // Validate the form fields
        if (!name || !address || !mobile || !email || !gst) {
            alert('Please fill in all fields');
            return;
        }

        const payload = {
            CUSTOMER_ID: editingCustomerId,
            CUSTOMER_name: name,
            CUSTOMER_address: address,
            CUSTOMER_mobile: mobile,
            CUSTOMER_email: email,
            CUSTOMER_gst: gst
        };

        axios.patch('http://localhost:3008/api/customers', payload) // Send a PATCH request to update the customer
            .then(() => {
                alert("Customer updated successfully"); // Notify the user of successful update
                getCustomer(); // Refresh the customer list
                clearForm(); // Clear the form fields
            })
            .catch(error => {
                console.error('Error updating customer:', error); // Log any errors that occur
            });
    };

    //<---------------------------------Utility Functions---------------------------------->
    // Function to clear the form fields
    const clearForm = () => {
        setName(""); // Clear the name field
        setAddress(""); // Clear the address field
        setMobile(""); // Clear the mobile field
        setEmail(""); // Clear the email field
        setGst(""); // Clear the GST field
        setEditingCustomerId(null); // Reset the editing customer ID
        setFormMode("add"); // Reset the form mode to 'add'
    };

    // Function to populate the form fields for editing a customer
    const populateForm = (customer) => {
        setName(customer.CUSTOMER_name); // Populate the name field
        setAddress(customer.CUSTOMER_address); // Populate the address field
        setMobile(customer.CUSTOMER_mobile); // Populate the mobile field
        setEmail(customer.CUSTOMER_email); // Populate the email field
        setGst(customer.CUSTOMER_gst); // Populate the GST field
        setEditingCustomerId(customer.CUSTOMER_ID); // Set the editing customer ID
        setFormMode("edit"); // Set the form mode to 'edit'
    };

    //<---------------------------------useEffect----------------------------------->
    // Fetch customers when the component mounts
    useEffect(() => {
        getCustomer(); // Fetch all customers
    }, []);

    //<---------------------------------Render-------------------------------------->
    // Render the component
    return (
        <div className="customer-container">
            <h2>Customer Management</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>GST</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.map((item, index) => (
                            <tr key={index}>
                                <td>{item.CUSTOMER_ID}</td>
                                <td>{item.CUSTOMER_name}</td>
                                <td>{item.CUSTOMER_address}</td>
                                <td>{item.CUSTOMER_mobile}</td>
                                <td>{item.CUSTOMER_email}</td>
                                <td>{item.CUSTOMER_gst}</td>
                                <td>
                                    <button onClick={() => populateForm(item)}>Edit</button>
                                    <button onClick={() => deleteCustomer(item.CUSTOMER_ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="add-customer-form">
                <h3>{formMode === "add" ? "Add New Customer" : "Edit Customer"}</h3>
                <hr />
                <div className="form-group">
                    <label>Customer Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="form-group">
                    <label>Customer Address:</label>
                    <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <div className="form-group">
                    <label>Customer Mobile:</label>
                    <input type="text" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                </div>
                <div className="form-group">
                    <label>Customer Email:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group">
                    <label>Customer GST:</label>
                    <input type="text" onChange={(e) => setGst(e.target.value)} value={gst} />
                </div>
                <button className="submit-btn" onClick={formMode === "add" ? addNewCustomer : updateCustomer}>
                    {formMode === "add" ? "Submit" : "Update"}
                </button>
                {formMode === "edit" && (
                    <button className="cancel-btn" onClick={clearForm}>Cancel</button>
                )}
            </div>
        </div>
    );
}

export default Customer;
