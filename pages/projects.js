import React from "react";

const Projects = () => (
    <div>
        <div>
            <h1 className="projects-label">Projects</h1>

            <div className='projects-list'>

                <div className="project-monty">
                    <h2><a className="blue-links" href="/monty">Monty</a></h2>
                    <p>View the progress of a live trading algorithm</p>
                    <p className="disclaimer">*Currently implementing serverless function for public view- only works locally.</p>
                </div>

                <div className="project-filelocker">
                    <h2><a className='blue-links' href='/filelocker'>File Locker</a></h2>
                    <p>Blockchain-enhanced information sharing</p>
                </div>

            </div>
        </div>
    </div>
)

export default Projects
