import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inviteUserToTeam } from '../api/team';
import { mapRoleToId } from '../utils/helpers';
import Button from '../components/Button';
import InviteUsers from '../components/InviteUsers';
import PopupModal from '../components/PopupModal';

const SendInvitePage = () => {
  let {team_id} = useParams();
  const navigate = useNavigate();

  const invitesInfo = {
    users: []
  }

  const [invites, setInvites] = useState(invitesInfo);
  const [modalContent, setModalContent] = useState({
    "title": "",
    "children": "",
    "showModal": false,
  });

  const handleSubmitInvites = () => {
    invites.users.forEach((user) => {
      inviteUserToTeam(team_id, user.email, mapRoleToId(user.userRole))
    });
    setModalContent({
      title: "Success",
      children: "You have successfully invited the users to your team. Redirecting you back to your teams screen in 3 seconds",
      showModal: true
    });
    setTimeout(() => {
        navigate("/view-teams");
        window.location.reload();
    }, 3000);
  }

  return (
    <>
      <div className="outer-invite">
        <h1 className="outer-invite-title">Send an invite to your team</h1>
        <div className="view-teams-invite-container">
          <InviteUsers invites={invites} onInvitesChange={setInvites}/>
          <Button onClick={handleSubmitInvites} className="view-teams-invite-button" children="Send Invite"/>
        </div>
      </div>
      <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
        onClose={() => setModalContent({title: "", children: "", showModal: false})} 
      />
    </>
  );
};

export default SendInvitePage;