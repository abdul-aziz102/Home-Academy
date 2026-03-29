const API = 'http://localhost:3000/api/admin';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
});

const adminApi = {
  login: async (email, password) => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  },

  get: async (path) => {
    const res = await fetch(`${API}/${path}`, { headers: getHeaders() });
    if (res.status === 401) { localStorage.removeItem('adminToken'); window.location.href = '/adminlogin'; }
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  },

  post: async (path, data) => {
    const res = await fetch(`${API}/${path}`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  },

  put: async (path, data) => {
    const res = await fetch(`${API}/${path}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(data) });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  },

  del: async (path) => {
    const res = await fetch(`${API}/${path}`, { method: 'DELETE', headers: getHeaders() });
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  },
};

export default adminApi;
