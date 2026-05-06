import { verifySession } from '../_lib/auth.js';
import { getDb } from '../_lib/db.js';
import { site_settings } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { action } = req.query;

  if (action === 'settings' && req.method === 'PUT') {
    const body = await parseBody(req);
    const db = getDb();
    const now = new Date().toISOString();
    for (const [key, value] of Object.entries(body)) {
      await db.insert(site_settings).values({ key, value, updated_at: now })
        .onConflictDoUpdate({ target: site_settings.key, set: { value, updated_at: now } });
    }
    return res.status(200).json({ success: true });
  }

  if (action === 'upload' && req.method === 'POST') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const boundary = req.headers['content-type']?.split('boundary=')[1];
    if (!boundary) return res.status(400).json({ error: 'Missing multipart boundary' });

    const parts = parseMultipart(buffer, boundary);
    const filePart = parts.find((p) => p.filename);
    if (!filePart) return res.status(400).json({ error: 'No file uploaded' });

    const b64 = filePart.data.toString('base64');
    const dataUri = `data:${filePart.contentType};base64,${b64}`;

    const formData = new URLSearchParams();
    formData.append('file', dataUri);
    formData.append('upload_preset', 'ml_default');

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Upload failed', details: err });
    }

    const result = await response.json();
    return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString());
}

function parseMultipart(buffer, boundary) {
  const parts = [];
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  let start = buffer.indexOf(boundaryBuffer) + boundaryBuffer.length;
  while (start < buffer.length) {
    const nextBoundary = buffer.indexOf(boundaryBuffer, start);
    if (nextBoundary === -1) break;
    const partBuffer = buffer.subarray(start, nextBoundary);
    const headerEnd = partBuffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) { start = nextBoundary + boundaryBuffer.length; continue; }
    const headers = partBuffer.subarray(0, headerEnd).toString();
    const data = partBuffer.subarray(headerEnd + 4, partBuffer.length - 2);
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    const contentTypeMatch = headers.match(/Content-Type:\s*(.+)/i);
    parts.push({
      filename: filenameMatch?.[1] || null,
      contentType: contentTypeMatch?.[1]?.trim() || 'application/octet-stream',
      data,
    });
    start = nextBoundary + boundaryBuffer.length;
  }
  return parts;
}
