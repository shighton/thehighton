// 'use client';

import { useSession, signIn } from 'next-auth/react';
import MusicUploadForm from '../components/main/MusicUploadForm';
import Playlist from '../components/main/Playlist';

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <div className='welcome'><h1 className='welcome-home'>Loading...</h1></div>;

    if (!session) {
        return (
            <div className='welcome'>
                <h1 className='welcome-home'>Halt, Bots and Troublemakers!</h1>
                <p className='must-login'>You must be logged in to view the playlist or upload to it.</p>
                <button className='account-button' onClick={() => signIn('google')}>Log In With Google</button>
                <p className='must-login'>In the meantime, here's a Malibu seagull looking wistfully into the distant ocean waves.</p>
                <div className='grad-images'>
                    <img className='fullbody-grad' src='resources/Bird.jpg'></img>
                </div>
            </div>
        );
    }

    return (
        <div className='welcome'>
            <h1 className='welcome-home'>Welcome, {(session.user.name).replace(/\s\w+/, '')}!</h1>
            <h1 className='big-sth'>The Playlist</h1>
            <Playlist/>
            <h1 className='big-sth'>Upload</h1>
            <p><b>One upload</b> or all your tracks will be deleted. All tracks are public for download. Wav files only.</p>
            <MusicUploadForm/>
            <p>Issue? Email below.</p>
        </div>
    )
}