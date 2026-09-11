'use client';

import { createClient } from '../../../lib/supabase/supabaseClient';
import fs from 'fs';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        console.log('Upload function successfully called:', req.method);

        const supabase = createClient();
        const form = formidable({ multiples: false });
    
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files});
            });
        });

        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const fileBuffer = fs.readFileSync(file.filepath);
        const fileName = `${Date.now()}-${file.originalFilename}`;

        // console.log(fields);

        const fileArtistName = fields.artistName;
        const fileTrackName = fields.trackName;
        const fileGenre = fields.genre;

        const { error: uploadError } = await supabase
            .storage
            .from('tracks')
            .upload(fileName, fileBuffer, {
                contentType: file.mimetype,
            });

        const { error: dbError } = await supabase
            .from('Tracks')
            .insert({
                fileName: fileName,
                fileArtistName: fileArtistName,
                fileTrackName: fileTrackName,
                fileGenre: fileGenre
            });

        if (uploadError) {
            console.error(uploadError);
            return res.status(500).json({error: "Storage upload failed."});
        }

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        console.error('Upload Error:', e);
        return res.status(500).json({error: 'Upload failed.'});
    }
}