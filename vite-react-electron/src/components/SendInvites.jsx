import { useState } from 'react';
import '../assets/css/inviteForm.css';


export const SendInvites = ({ onInvitesChange }) =>{  
  const [formData, setFormData] = useState({
    users: [
      { name: '', userRole: '', email: '' },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedUsers = [...prevFormData.users];
      updatedUsers[index][name] = value;
      return { ...prevFormData, users: updatedUsers };
    });
  };

  if (onInvitesChange) {
    onInvitesChange(formData);
  }

  const handleAddUser = () => {
    if (formData.users.every(user => user.name && user.userRole && user.email)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        users: [...prevFormData.users, { name: '', userRole: '', email: '' }],
      }));
    }
  };

  const handleDeleteUser = (index) => {
    setFormData((prevFormData) => {
      const updatedUsers = [...prevFormData.users];
      updatedUsers.splice(index, 1);
      return { ...prevFormData, users: updatedUsers };
    });
  };

  const handleClearUser = (index) => {
    setFormData((prevFormData) => {
      const updatedUsers = [...prevFormData.users];
      updatedUsers[index] = { name: '', userRole: '', email: '' };
      return { ...prevFormData, users: updatedUsers };
    });
  };

  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const textStyle = { color: 'black' };
  const options = ['One', 'Two', 'Three', 'Four', 'Five'];

  return (
    <div className="user-form">
      <h2 style={textStyle} className="form-title">Send Invites</h2>
      <form className="form">
        {formData.users.map((user, index) => (
          <details key={index} className="user-section">
            <summary className="user-summary">
              Invite {index + 1}
            </summary>
            <div style={{ marginBottom: '20px' }} className="user-details">
              <label htmlFor={`name-${index}`} style={textStyle} className="form-label">Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={user.name}
                onChange={(e) => handleChange(e, index)}
                required
                style={textStyle}
                className="form-input"
              />
              <label htmlFor={`userRole-${index}`} style={textStyle} className="form-label">User Role:</label>
              <select 
                id={`userRole-${index}`}
                name="userRole"
                value={user.userRole}
                onChange={(e) => handleChange(e, index)}
                required
                style={textStyle}
                className="form-input">
 
                    <option>Please choose one option</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select>
              <label htmlFor={`email-${index}`} style={textStyle} className="form-label">Email:</label>
              <input
                type="email"
                id={`email-${index}`}
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e, index)}
                required
                style={textStyle}
                className="form-input"
              />
              {user.email && !validateEmail(user.email) && (
                <p style={{ color: 'red', margin: 0 }} className="error-message">Please enter a valid email address.</p>
              )}
              <button type="button" onClick={() => handleClearUser(index)} className="clear-button">Clear</button>
              <button type="button" onClick={() => handleDeleteUser(index)} className="delete-button">
                <span role="img" aria-label="Delete User" style={{ fontSize: '18px' }}>❌</span>
              </button>
            </div>
          </details>
        ))}
        <button
          type="button"
          onClick={handleAddUser}
          style={formData.users.every(user => user.name && user.userRole && user.email) ? textStyle : { color:'white', pointerEvents: 'none', opacity: 0.5 }}
          className="add-user-button"
        >
          Add User
        </button>
        
      </form>
    </div>
  );
};

export default SendInvites;