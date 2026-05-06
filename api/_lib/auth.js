import jwt from 'jsonwebtoken';

const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_NAME = 'holistic_session';

export function createSessionCookie(userId) {
  const token = jwt.sign({ sub: userId }, SESSION_SECRET, { expiresIn: '24h' });
  const maxAge = 60 * 60 * 24;
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function verifySession(req) {
  const cookies = parseCookies(req.headers.cookie || '');
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  try {
    return jwt.verify(token, SESSION_SECRET);
  } catch {
    return null;
  }
}

function parseCookies(header) {
  const result = {};
  for (const pair of header.split(';')) {
    const [key, ...rest] = pair.trim().split('=');
    if (key) result[key] = rest.join('=');
  }
  return result;
}
