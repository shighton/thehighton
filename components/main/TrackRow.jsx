export function TrackRow({ track }) {
    return (
        <div className='track-row'>
            <p className="track-title">{((track.name).replace(/\d+\-/, '')).replace(/\.wav/, '')}</p>
            <audio controls preload='none'>
                <source src={track.url} type='audio/wav' />
            </audio>
        </div>
    );
}