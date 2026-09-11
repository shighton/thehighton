import { createClient } from '../../../lib/supabase/supabaseServer';

export default async function handler(req, res) {
    const supabase = createClient(req, res);

    const { data, error } = await supabase
        .storage
        .from('tracks')
        .list();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const tracksWithUrls = await Promise.all(data
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(async file => {
            const fullPath = file.name;

            const { data: urlData } = supabase
                .storage
                .from('tracks')
                .getPublicUrl(fullPath);

            const {data: fileName, fileNameError} = await supabase
                .from('Tracks')
                .select('fileTrackName')
                .eq('fileName', file.name)
                .single()

            const {data: artistName, artistNameError} = await supabase
                .from('Tracks')
                .select('fileArtistName')
                .eq('fileName', file.name)
                .single()

            const {data: genre, genreError} = await supabase
                .from('Tracks')
                .select('fileGenre')
                .eq('fileName', file.name)
                .single()

            // console.log(fileName.fileTrackName, urlData.publicUrl);

            return {
                name: fileName.fileTrackName,
                url: urlData.publicUrl,
                artistName: artistName.fileArtistName,
                genre: genre.fileGenre,
            };
        })
    );

    // console.log(tracksWithUrls);

    const shuffledTracks = shuffleArray(tracksWithUrls);

    // console.log(shuffledTracks);

    // console.log(data);

    res.status(200).json(shuffledTracks);
}

function shuffleArray(array) {
  const arr = [...array]; // avoid mutating original

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}