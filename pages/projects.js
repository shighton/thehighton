import React from "react";

const Projects = () => (
    <div>
        <div>
            <h1 className="projects-label">Projects</h1>

            <div className='projects-list'>

                <div className="project-rna">
                    <h2><a className="blue-links" href="/rna">RNA Pairing Published Research</a></h2>
                    <p>Academic research regarding RNA Pairing Outcomes</p>
                    <p className="disclaimer">*Excepted to IEEE SoutheastCon 2024.</p>
                </div>

                <div className="project-monty">
                    <h2><a className="blue-links" href="/monty">Monty</a></h2>
                    <p>Consort a live BTC trading algorithm</p>
                    <p className="disclaimer">*See what a live trading algorithm would do in the market.</p>
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
