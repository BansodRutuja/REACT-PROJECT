import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User2 = () => {
  // State for user data
  const [user2, setUser2] = useState([]);

  // State for form inputs
  const [formData, setFormData] = useState({
    user2_ID: '',
    user2_name: '',
    user2_address: '',
    user2_mobile: '',
    user2_email: '',
  });

  // Get all users
  const getUser2 = () => {
    axios
      .get('http://localhost:3008/api/user2')
      .then((response) => {
        console.log(response.data);
        setUser2(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add a new user
  const addUser2 = () => {
    axios
      .post('http://localhost:3008/api/user2', formData)
      .then(() => {
        console.log('User added successfully.');
        getUser2();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update a user
  const updateUser2 = () => {
    axios
      .patch('http://localhost:3008/api/user2', formData)
      .then(() => {
        console.log('User updated successfully.');
        getUser2();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete a user
  const deleteUser2 = (id) => {
    axios
      .delete('http://localhost:3008/api/user2', { data: { user2_ID: id } })
      .then(() => {
        console.log('User deleted successfully.');
        getUser2();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for adding/updating users
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.user2_ID) {
      updateUser2();
    } else {
      addUser2();
    }
    setFormData({
      user2_ID: '',
      user2_name: '',
      user2_address: '',
      user2_mobile: '',
      user2_email: '',
    });
  };

  // Load data on page load
  useEffect(() => {
    getUser2();
  }, []);

  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user2_name"
          placeholder="Name"
          value={formData.user2_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="user2_address"
          placeholder="Address"
          value={formData.user2_address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="user2_mobile"
          placeholder="Mobile"
          value={formData.user2_mobile}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="user2_email"
          placeholder="Email"
          value={formData.user2_email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{formData.user2_ID ? 'Update User' : 'Add User'}</button>
      </form>

      <button onClick={getUser2}>Get Users</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user2.map((item) => (
              <tr key={item.user2_ID}>
                <td>{item.user2_ID}</td>
                <td>{item.user2_name}</td>
                <td>{item.user2_address}</td>
                <td>{item.user2_mobile}</td>
                <td>{item.user2_email}</td>
                <td>
                  <button
                    onClick={() =>
                      setFormData({
                        user2_ID: item.user2_ID,
                        user2_name: item.user2_name,
                        user2_address: item.user2_address,
                        user2_mobile: item.user2_mobile,
                        user2_email: item.user2_email,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteUser2(item.user2_ID)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User2;
