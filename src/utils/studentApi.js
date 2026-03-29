const API = 'http://localhost:3000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('studentToken')}`,
});

const studentApi = {
  login: async (email, password) => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  },

  signup: async (data) => {
    const res = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  },

  getProfile: async () => {
    const res = await fetch(`${API}/student/profile`, { headers: getHeaders() });
    if (res.status === 401) { localStorage.removeItem('studentToken'); window.location.href = '/student-login'; }
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  },

  getDashboard: async () => {
    const res = await fetch(`${API}/student/dashboard`, { headers: getHeaders() });
    if (res.status === 401) { localStorage.removeItem('studentToken'); window.location.href = '/student-login'; }
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  },

  logout: () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentData');
    window.location.href = '/student-login';
  },
};

export default studentApi;
