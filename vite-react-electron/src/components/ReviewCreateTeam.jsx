import Accordion from "./Accordion"

export default function ReviewCreateTeam({ project , invites }) {
    
    return (
        <>
            <Accordion title="Project Info" children={
                <>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Name</div>
                        <div className="accordion-value">{project.name}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Description</div>
                        <div className="accordion-value">{project.description}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Technologies</div>
                        <div className="accordion-value">{project.technologies.map((tech, index) => (<span key={index}>{tech}, </span>))}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Time Frame</div>
                        <div className="accordion-value">{project.timeframe}</div>
                    </div>
                </>
            }/>
            {<Accordion title="Invitations" children={
                invites.users.map((user, index) =>
                <>
                <div className="invite">
                <div className="accordion-key-value-container">
                        <div className="accordion-key">Name</div>
                        <div className="accordion-value">{user.name}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">User Role</div>
                        <div className="accordion-value">{user.userRole}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Email</div>
                        <div className="accordion-value">{project.timeframe}</div>
                    </div>
                </div>
                </>)
                
            }/>}
        </>
    )
}