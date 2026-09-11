export function TrackRow({ track, isPlaying, onPlay }) {
    return (
        <div className='track-row'>
            
            {/* <p className="track-title">{((track.name).replace(/\d+\-/, '')).replace(/\.wav/, '')}</p> */}

            <p className="track-title">{(track.name).replace(/\[\"/, '').replace(/\"\]/, '')}</p>

            <p className="track-title">{(track.artistName).replace(/\[\"/, '').replace(/\"\]/, '')}</p>

            <p className="track-title">{(track.genre).replace(/\[\"/, '').replace(/\"\]/, '')}</p>

            <button className='track-play-button' onClick={onPlay}>
                {isPlaying ? '❚❚' : '▶'}
            </button>

            {/* <audio
                ref={audioRef}
                controls
                preload='none'
                src={track.url}
                onPlay={onTrackClick}
                onEnded={onEnded}
            ></audio> */}

        </div>
    );
}
