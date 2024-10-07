import React from "react";

const FileLocker = () => (
    <div>

        <div className="filelocker-label">
            <h1>Power BI Projects</h1>
            <p>Data Visualized.</p>
        </div>

        <div className="tableau-img">
            <p>Sales Template</p>
            <img className="tableau-prntscrn-img" src="resources/PowerBI_sales1.png"></img>
        </div>

        <div className="filelocker-info">
            <p>See other <a href='/projects' className='blue-links'>projects</a>.</p>
        </div>

    </div>
)

export default FileLocker
