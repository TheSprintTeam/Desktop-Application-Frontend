import React, { useState } from 'react';
import { inviteUserToTeam } from '../api/team';
import "../assets/css/SendInvite.css";

const SendInvitePage = () => {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const roleOptions = ['Select a role', 'Admin', 'Manager', 'Employee'];

  return (
    <div class = "outer">
      <h2 class = "Title"> Send an invite</h2>
      <form onSubmit={handleSubmit}>
        <div class = "form-field">
          <label class = "label" htmlFor="email">Email: </label>
          <br></br>
          <input
          class = "input-field"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div class = "form-field">
          <label class = "label" htmlFor="role">Role: </label>
          <br></br>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            {roleOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div class = "flex">
        <div class ="button-outer-submit"><button class = "button" type="submit">Submit</button></div>
        <div class ="button-outer-prev"><button class = "button" type="">Previous</button></div>
        </div>
      </form>
    </div>
  );
};

export default SendInvitePage;