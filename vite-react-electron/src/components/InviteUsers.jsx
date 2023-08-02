import { useState, useCallback } from 'react';
import { InputField } from './InputFields';
import { isEmptyObjectField, validateEmail, roles} from '../utils/helpers';
import { FaCircleUser, FaPlus, FaRegCircleXmark, FaRegCircleCheck } from 'react-icons/fa6';
import "../assets/css/InviteUsers.css";

export default function InviteUsers({ invites, onInvitesChange }) {

  const userInfo = {
    name: "",
    userRole: "",
    email: "",
  }
  const [inviteUser, setInviteUser] = useState(userInfo)
  const [editIndex, setEditIndex] = useState(-1)
  console.log(roles);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInviteUser((prevInputs) => ({ ...prevInputs, [name]: value }));
  }

  const handleAddUser = useCallback(e => {
    console.log(inviteUser);
    if (!isEmptyObjectField(inviteUser)) {
      onInvitesChange((prevInvites) => ({
        ...prevInvites, users: [...prevInvites.users, inviteUser],
      }));
      setInviteUser({
        name: "",
        userRole: "",
        email: ""
      })
    }
  }, [inviteUser, invites, onInvitesChange]);

  const handleEditInputChange = useCallback((e, index) => {
    const { name, value } = e.target;
    const updatedUsers = [...invites.users];
    updatedUsers[index] = { ...updatedUsers[index], [name]: value};
    const updatedInvites = { ...invites, users: updatedUsers };
    onInvitesChange(updatedInvites);
  }, [invites, onInvitesChange])

  const handleDeleteUser = useCallback((index) => {
    const updatedUsers = invites.users.slice();
    updatedUsers.splice(index, 1);
    const updatedInvites = { ...invites, users: updatedUsers }
    onInvitesChange(updatedInvites);
    setEditIndex(-1);
  }, [editIndex, setEditIndex, invites, onInvitesChange])

  return (
    <>
      <div className="invite-user-container">
        {invites.users && 
          <div className="invited-users-container">
            {invites.users.map((user, index) => { return ((editIndex === index) ?
              <div className="add-user-container">
                  <div className="invite-user-top">
                    <div className="input-field-container-invite name">
                        <div className="input-field-title-invite">Name</div>
                        <InputField name="name" className="input-field-invite" autoFocus={true} value={invites.users[index].name ? invites.users[index].name : ""}
                          placeholder="Enter the full name" onChange={(e) => handleEditInputChange(e, index)}
                        />
                    </div>
                    <div className="input-field-container-invite select">
                        <div className="input-field-title-invite">Role</div>
                        <select name="userRole" className="select-field-invite" value={invites.users[index].userRole ? invites.users[index].userRole : ""} 
                          onChange={(e) => handleEditInputChange(e, index)}>
                          {roles.map((role) => {
                            return <option key={role.id}>{role.role}</option>
                          })}
                        </select>
                    </div>
                  </div>
                  <div className="invite-user-bottom">
                    <div className="input-field-container-invite">
                        <div className="input-field-title-invite">Email Address</div>
                        <InputField name="email" className="input-field-invite" autoFocus={true} value={invites.users[index].email ? invites.users[index].email : ""}
                          placeholder="Enter the email of the team member" onChange={(e) => handleEditInputChange(e, index)}
                        />
                        {inviteUser.email && !validateEmail(inviteUser.email) && <div className="input-error-invite">Please enter a valid email address</div>}
                    </div>
                  </div>
                  <div className="edit-member" onClick={() => setEditIndex(-1)}>
                    <div className="member-icon-container delete" onClick={handleDeleteUser}><span className="add-another-member-icon"><FaRegCircleXmark /></span>
                      <div>Delete</div>
                    </div>
                    <div className="member-icon-container save" onClick={() => setEditIndex(-1)}><span className="add-another-member-icon"><FaRegCircleCheck /></span>
                      <div>Save</div>
                    </div>
                  </div>
                </div>
                :
                <div key={index} className="user-container">
                  <div className="profile-icon-wrapper">
                    <span className="profile-icon"><FaCircleUser /></span><div className="user-details-invite">{user.name} - {user.userRole}</div>
                  </div>
                  <div className="change-details" onClick={() => setEditIndex(index)}>
                    Change Details
                  </div>
                </div>
            )})}
          </div>
        }
        <div className="add-user-container">
          <div className="invite-user-top">
            <div className="input-field-container-invite name">
                <div className="input-field-title-invite">Name</div>
                <InputField name="name" className="input-field-invite" autoFocus={true} value={inviteUser.name ? inviteUser.name : ""}
                  placeholder="Enter the full name" onChange={handleInputChange}
                />
            </div>
            <div className="input-field-container-invite select">
                <div className="input-field-title-invite">Role</div>
                <select name="userRole" className="select-field-invite" value={inviteUser.userRole ? inviteUser.userRole : ""} onChange={handleInputChange}>
                  {roles.map((role) => {
                    return <option key={role.id}>{role.role}</option>
                  })}
                </select>
            </div>
          </div>
          <div className="invite-user-bottom">
            <div className="input-field-container-invite">
                <div className="input-field-title-invite">Email Address</div>
                <InputField name="email" className="input-field-invite" autoFocus={true} value={inviteUser.email ? inviteUser.email : ""}
                  placeholder="Enter the email of the team member" onChange={handleInputChange}
                />
                {inviteUser.email && !validateEmail(inviteUser.email) && <div className="input-error-invite">Please enter a valid email address</div>}
            </div>
          </div>
          <div className="add-another-member">
            <div className="member-icon-container" onClick={handleAddUser}>
              <span className="add-another-member-icon"><FaPlus /></span>Another Team Member
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

