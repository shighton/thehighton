import { createClient } from '../../../lib/supabase/supabaseServer';

export default async function handler(req, res) {
    const { file } = req.query;

    if (!file) {
        return res.status(400).json({ error: 'No file specified' });
    }

    const supabase = createClient(req, res);

    const { data: urlData, error: urlError } = supabase
        .storage
        .from('tracks')
        .getPublicUrl(file);

    if (urlError) {
        return res.status(500).json({ error: urlError.message });
    }

    const headers = {};

    if (req.headers.range) {
        headers.Range = req.headers.range;
    }

    const response = await fetch(urlData.publicUrl, {
        headers
    });

    if (!response.ok) {
        return res.status(response.status).end();
    }

    res.status(response.status);

    res.setHeader(
        'Content-Type',
        response.headers.get('content-type') || 'audio/*'
    );

    if (response.headers.get('content-length')) {
        res.setHeader(
            'Content-Length',
            response.headers.get('content-length')
        );
    }

    if (response.headers.get('content-range')) {
        res.setHeader(
            'Content-Range',
            response.headers.get('content-range')
        );
    }

    res.setHeader('Accept-Ranges', 'bytes');

    if (response.body) {
        const reader = response.body.getReader();

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                res.write(Buffer.from(value));
            }
        } finally {
            reader.releaseLock();
        }
    }

    res.end();
}