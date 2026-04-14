import { useEffect, useState } from 'react';
import { TrackRow } from './TrackRow';

export default function Playlist() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tracks/')
            .then(res => res.json())
            .then(data => {
                setTracks(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading playlist...</p>;

    return (
        <div className='playlist'>
            {tracks.length === 0 || tracks[tracks.length - 1].name === '.emptyFolderPlaceholder' ? (
                <p>No tracks in playlist.</p>
            ) : (
                tracks.map(track => (
                    <TrackRow key={track.id} track={track} />
                ))
            )}
            <p>Playlist is randomized upon refresh.</p>
        </div>
    );
}