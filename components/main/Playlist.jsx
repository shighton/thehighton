import { useEffect, useRef, useState } from 'react';
import { TrackRow } from './TrackRow';

export default function Playlist() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);

    const audioRefs = useRef([]);

    useEffect(() => {
        fetch('/api/tracks/')
            .then(res => res.json())
            .then(data => {
                setTracks(data);
                setLoading(false);
            });
    }, []);

    const playPlaylist = () => {
        if (isPlaying) {
            audioRefs.current[currentTrack]?.pause();
            setIsPlaying(false);
        } else if (tracks.length > 0) {
            audioRefs.current[currentTrack]?.play();
            setIsPlaying(true);
        }
    };

    const handleTrackEnd = (index) => {
        const nextIndex = index + 1;

        if (nextIndex < tracks.length) {
            setCurrentTrack(nextIndex);
            audioRefs.current[nextIndex]?.play();
        } else {
            setIsPlaying(false);
        }
    };

    if (loading) return <p>Loading playlist...</p>;

    return (
        <div className='playlist'>
            <div className='playlist-button'>
                <button className='play-playlist' onClick={playPlaylist}>{!isPlaying ? '▶ Play' : '❚❚ Pause'}</button>
            </div>

            <div className='playlist-header'>
                <h2>Name</h2>
                <h2>Artist</h2>
                <h2>Genre</h2>
                <h2>Audio</h2>
            </div>
            {tracks.length === 0 || tracks[tracks.length - 1].name === '.emptyFolderPlaceholder' ? (
                <p>No tracks in playlist.</p>
            ) : (
                tracks.map((track, index) => (
                    <TrackRow
                        key={track.url}
                        track={track}
                        index={index}
                        audioRef={el => audioRefs.current[index] = el}
                        onTrackClick={() => setCurrentTrack(index)}
                        onEnded={() => handleTrackEnd(index)}
                    />
                ))
            )}
            <p className='playlist-subtext'>Playlist is randomized every render.</p>
        </div>
    );
}