import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { inviteUserToTeam } from '../api/team';
import { roles, mapRoleToId } from '../utils/helpers';
import "../assets/css/SendInvite.css";

const SendInvitePage = () => {
  const [inviteUser, setInviteUser] = useState({
    email: "",
    role: "Member",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInviteUser((prevInviteUser) => ({
      ...prevInviteUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    inviteUserToTeam(team_id, inviteUser.email, mapRoleToId(inviteUser.role));
  };

  let {team_id} = useParams();
  
  return (
    <div className="outer">
      <h2 className="Title"> Send an invite</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className = "label" htmlFor="email">Email: </label>
          <br></br>
          <input
          className = "input-field"
            type="email"
            id="email"
            name="email"
            value={inviteUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className = "form-field">
          <label className = "label" htmlFor="role">Role: </label>
          <br></br>
          <select
            id="role"
            name="role"
            value={inviteUser.role}
            onChange={handleChange}
            required
          >
            {roles.map((role) => (
              <option key={role.id} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
        </div>
        <div className = "flex">
        <div className ="button-outer-submit"><button class = "button" type="submit">Submit</button></div>
        <div className ="button-outer-prev"><button class = "button" type="">Previous</button></div>
        </div>
      </form>
    </div>
  );
};

export default SendInvitePage;