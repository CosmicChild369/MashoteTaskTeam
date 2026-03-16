const API_BASE_URL = (import.meta.env.VITE_BACKEND_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
const ROLE_API_PATH = import.meta.env.VITE_ROLE_API_PATH || '/api/users';

const buildUrl = (path = '') => `${API_BASE_URL}${ROLE_API_PATH}${path}`;

async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function saveUserRole({ uid, email, role, inviteCode }) {
  if (!uid || !email || !role) {
    throw new Error('Missing required role payload fields.');
  }

  const response = await fetch(buildUrl(''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid,
      email,
      role,
      inviteCode: inviteCode || null,
    }),
  });

  const data = await parseJsonResponse(response);
  if (!response.ok) {
    const message = data?.message || `Failed to save role (HTTP ${response.status}).`;
    throw new Error(message);
  }

  return data;
}

export async function fetchUserRole(uid) {
  if (!uid) {
    throw new Error('Missing uid while fetching role.');
  }

  const response = await fetch(buildUrl(`/${encodeURIComponent(uid)}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await parseJsonResponse(response);
  if (!response.ok) {
    const message = data?.message || `Failed to fetch role (HTTP ${response.status}).`;
    throw new Error(message);
  }

  return data?.role ?? null;
}
