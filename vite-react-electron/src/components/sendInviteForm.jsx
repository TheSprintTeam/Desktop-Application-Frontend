import { inviteUserToTeam } from "../api/team.jsx";

class SendInvite extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email: "", role : ""};
      this.handleEmail = this.handleEmail.bind(this)
      this.handleRole = this.handleRole.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(event) {
      this.state["role"] = event.target.value;
    }
    handleRole(event){
      this.state["role"] = event.target.value;
    }

    options = ['One', 'Two', 'Three', 'Four', 'Five'];
  
    async handleSubmit(event) {
      
      await inviteUserToTeam(props["team_id"], state["email"], state["role"]);
      event.preventDefault();

    }
  
    render() {
      return (

        
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" value={this.state["email"]} onChange={this.handleEmailo} />
          </label>
          <label>
            Role:
            <select onChange={this.handleRole}>
 
                    <option>Please choose one option</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
