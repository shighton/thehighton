export function TrackRow({ track }) {
    return (
        <div className='track-row'>
            
            <p className="track-title">{((track.name).replace(/\d+\-/, '')).replace(/\.wav/, '')}</p>

            {/* <p>{track.url}</p> */}

            <audio controls preload='none' src={track.url}></audio>

        </div>
    );
}