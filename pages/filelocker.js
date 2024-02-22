import React from "react";

const FileLocker = () => (
    <div>

        <div className="filelocker-label">
            <h1>File Locker</h1>
            <p>Secure sharing.</p>
        </div>

        <div className="filelocker-video">
            <iframe width="560" height="315" 
            src="https://www.youtube-nocookie.com/embed/bFGq4kOXKdA?si=4VxQbUNiJNSns20j" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        </div>

        <div className="filelocker-info">
            <p>File Locker is a blockchain-enhanced secure file sharing system.</p>
            <p>View the <a href='https://github.com/shighton/files_dapp' className='blue-links' 
            target='_blank'>GitHub</a> page.</p>

            <p><a className='blue-links' href='/filetry'>Try Now</a></p>
        </div>

    </div>
)

export default FileLocker
