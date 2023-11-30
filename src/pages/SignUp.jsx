import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import blackhole from "../assets/blackhole2.mp4";

const SignUp = () => {
  const initialFormData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5555/users",
        formData
      );
      console.log("User added successfully:", response.data);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <div style={styles.bg}>
        <div style={styles.videoContainer}>
          <video style={styles.videoTag} autoPlay loop muted>
            <source src={blackhole} type="video/mp4" />
          </video>
          <div style={styles.overlay}></div>
        </div>
      </div>
      <div style={styles.content}>
        <Link to="/">Home</Link>
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Birth Date:
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  videoContainer: {
    position: "absolute",
    zIndex: "-1",
  },

  videoTag: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  content: {
    zIndex: "1",
    color: "white",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "80px",
    background: "linear-gradient(to bottom, transparent, black)",
  },

  bg: {
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "-1",
    backgroundColor: "black",
    height: "100vh",
  },
  signupContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
  },
};

export default SignUp;
