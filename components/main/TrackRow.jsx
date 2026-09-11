export function TrackRow({ track, audioRef, onTrackClick, onEnded }) {
    return (
        <div className='track-row'>
            
            {/* <p className="track-title">{((track.name).replace(/\d+\-/, '')).replace(/\.wav/, '')}</p> */}

            <p className="track-title">{(track.name).replace(/\[\"/, '').replace(/\"\]/, '')}</p>

            <p className="track-title">{(track.artistName).replace(/\[\"/, '').replace(/\"\]/, '')}</p>

            <p className="track-title">{(track.genre).replace(/\[\"/, '').replace(/\"\]/, '')}</p>

            <audio
                ref={audioRef}
                controls
                preload='none'
                src={track.url}
                onPlay={onTrackClick}
                onEnded={onEnded}
            ></audio>

        </div>
    );
}
