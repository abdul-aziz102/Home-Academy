import React, { useEffect, useState } from 'react';
import adminApi from '../../utils/adminApi';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ students: 0, courses: 0, teachers: 0, contacts: 0 });

  useEffect(() => {
    Promise.all([
      adminApi.get('students'),
      adminApi.get('courses'),
      adminApi.get('teachers'),
      adminApi.get('contacts'),
    ]).then(([s, c, t, m]) => {
      setCounts({ students: s.length, courses: c.length, teachers: t.length, contacts: m.length });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Students', count: counts.students, color: '#2563eb' },
    { label: 'Courses', count: counts.courses, color: '#16a34a' },
    { label: 'Teachers', count: counts.teachers, color: '#9333ea' },
    { label: 'Contacts', count: counts.contacts, color: '#ea580c' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${c.color}` }}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>{c.label}</p>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>{c.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
