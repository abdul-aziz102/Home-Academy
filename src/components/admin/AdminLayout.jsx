import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/courses', label: 'Courses' },
  { to: '/admin/teachers', label: 'Teachers' },
  { to: '/admin/contacts', label: 'Contacts' },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/adminlogin');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  const activeStyle = { background: '#2563eb', color: '#fff' };
  const baseStyle = { display: 'block', padding: '0.75rem 1.25rem', borderRadius: '8px', textDecoration: 'none', color: '#334155', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      <aside style={{ width: '240px', background: '#fff', padding: '1.5rem 1rem', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b', marginBottom: '2rem', textAlign: 'center' }}>Home Academy</h2>
        <nav style={{ flex: 1 }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              style={({ isActive }) => ({ ...baseStyle, ...(isActive ? activeStyle : {}) })}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} style={{ padding: '0.625rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
