'use client'
import { useState } from 'react';
import { createClient } from '../../lib/supabase/supabaseClient';

export default function MusicUploadForm() {
    const supabase = createClient();

    const [file, setFile] = useState(null);
    const [artistName, setArtistName] = useState('');
    const [trackName, setTrackName] = useState('');
    const [genre, setGenre] = useState('AI Slop');
    const [fileUploadMessage, setFileUploadMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const fileName = file.name;

        const { error: uploadError } = await supabase
            .storage
            .from('tracks')
            .upload(fileName, file);
        
        if (uploadError) {
            // console.error(uploadError);
            setFileUploadMessage(`Upload failed: ${uploadError.message}`);
            return;
        } else {
            setFileUploadMessage('File upload success!');
            const formData = new FormData();
            formData.append('fileName', fileName);
            formData.append('artistName', artistName);
            formData.append('trackName', trackName);
            formData.append('genre', genre);
    
            const res = await fetch('api/tracks/upload', {
                method: 'POST',
                body: formData,
            });
    
            // const data = await res.json();
            const data = await res.text();
            // alert(data.message);
            console.log('Metadata upload status: ', data);
        }
    };

    return (
        <div className='responsive-form'>
            <form className='upload-form' onSubmit={handleSubmit}>
                <label className='upload-form-label'>Artist Name:</label>
                <input className='upload-form-input' type='text' placeholder='Enter artist name' name='artistName' value={artistName} onChange={e => setArtistName(e.target.value)} required />

                <label className='upload-form-label'>Track Name:</label>
                <input className='upload-form-input' type='text' placeholder='Enter track name' name='trackName' value={trackName} onChange={e => setTrackName(e.target.value)} required />

                <label className='upload-form-label'>Genre:</label>
                <select className='select-upload' onChange={e => setGenre(e.target.value)} required>
                    <option>AI Slop</option>
                    <option>Alternative</option>
                    <option>Classical</option>
                    <option>Comedy</option>
                    <option>Country</option>
                    <option>Electronic</option>
                    <option>Folk</option>
                    <option>Hip-Hop</option>
                    <option>Jazz</option>
                    <option>Metal</option>
                    <option>Other</option>
                    <option>Pop</option>
                    <option>Punk</option>
                    <option>Rock</option>
                    <option>Trash</option>
                </select>

                <label className='upload-form-label'>File:</label>
                <label className='upload-form-file-label'>
                    Choose File
                    <input className='upload-form-input' type='file' name='track' accept='audio/*' onChange={e => setFile(e.target.files[0])} required />
                </label>

                {/* <input type='text' placeholder='What artist is most similar?' name='adjacentArtist' value={artist} onChange={e => setArtist(e.target.value)} required /> */}
                
                <button className='upload-form-submit' type='submit'>Upload Track</button>
            </form>

            <p>{fileUploadMessage}</p>
        </div>
    );
}