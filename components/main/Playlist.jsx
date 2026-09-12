import { useEffect, useRef, useState } from 'react';
import { TrackRow } from './TrackRow';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Playlist() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        fetch('/api/tracks/')
            .then(res => res.json())
            .then(data => {
                setTracks(data);
                setLoading(false);
            });
    }, []);

    const playPlaylist = () => {
        const audio = audioRef.current;

        if (!audio || tracks.length === 0) return;

        if (isPlaying) {
            audio.audio.current?.pause();
            setIsPlaying(false);
        } else {
            audio.audio.current?.play();
            setIsPlaying(true);
        }
    };

    const playTrack = (index) => {
        const audio = audioRef.current;

        if (!audio) return;

        setCurrentTrack(index);

        setTimeout(() => {
            audio.audio.current?.play();
            setIsPlaying(true);
        }, 0);
    };

    const handleTrackEnd = () => {
        const nextIndex = currentTrack + 1;

        if (nextIndex < tracks.length) {
            setCurrentTrack(nextIndex);
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio || tracks.length === 0 || !isPlaying) return;

        audio.audio.current?.load();

        audio.audio.current?.play().catch(error => {
            console.log('Playback failure: ', error);
            setIsPlaying(false);
        });
    }, [currentTrack]);

    if (loading) return <p className='first-line'>Loading playlist...</p>;

    return (
        <div className='playlist'>

            {tracks.length === 0 || tracks[tracks.length - 1].name === '.emptyFolderPlaceholder' ? (
                <p>No tracks in playlist.</p>
            ) : (
                <h2 className='now-playing-title'>{tracks[currentTrack].name.replace(/\[\"/, '').replace(/\"\]/, '')} - {tracks[currentTrack].artistName.replace(/\[\"/, '').replace(/\"\]/, '')}</h2>
            )}

            <AudioPlayer
                className='highton-player'
                ref={audioRef}
                src={tracks[currentTrack]?.url}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleTrackEnd}
                autoPlay={isPlaying}
                showSkipControls={false}
                showJumpControls={true}
            />

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
                        isPlaying={isPlaying && currentTrack === index}
                        onPlay={() => {
                            if (isPlaying && currentTrack === index) {
                                audioRef.current?.audio.current?.pause();
                                setIsPlaying(false);
                            } else {
                                playTrack(index)
                            }
                        }}
                    />
                ))
            )}

            <div className='playlist-button'>
                <button className='play-playlist' onClick={playPlaylist}>{!isPlaying ? '▶ Play' : '❚❚ Pause'}</button>
            </div>

            <p className='playlist-subtext'>Playlist is randomized on refresh.</p>
        </div>
    );
}