import React from "react";

const Projects = () => (
    <div>
        <div>
            <h1 className="projects-label">Projects</h1>

            <div className='projects-list'>

                <div className="project-monty">
                    <h2>Monty</h2>
                    <p>View the progress of a <a className="blue-links" href="/monty">live trading</a> algorithm</p>
                    <p className="disclaimer">*Currently works by invite only</p>
                </div>

                <div className="project-filelocker">
                    <h2>File Locker</h2>
                    <p>Interact with a blockchain-enhanced <a className='blue-links' href='/filelocker'>information 
                    sharing</a> system</p>
                </div>

            </div>
        </div>
    </div>
)

export default Projects
