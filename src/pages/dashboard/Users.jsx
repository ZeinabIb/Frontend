import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/users")
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5555/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <Link to="/signup">signup</Link>
      <h2>Users List</h2>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="users-container">
          {users.map((user, index) => (
            <div className="user-card" key={index}>
              <h3>
                {user._id}{" "}
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </h3>
              <p>Email: {user.email}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Birth Date: {user.birthDate}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Users;
