import React, { useEffect, useState } from 'react';
import adminApi from '../../utils/adminApi';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = () => adminApi.get('students').then(setStudents).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (s) => { setEditing(s._id); setForm({ name: s.name, email: s.email, level: s.level, phone: s.phone || '' }); };
  const cancelEdit = () => { setEditing(null); setForm({}); };

  const saveEdit = async (id) => {
    await adminApi.put(`students/${id}`, form);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    await adminApi.del(`students/${id}`);
    load();
  };

  const th = { padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' };
  const td = { padding: '0.75rem', fontSize: '0.875rem', color: '#334155', borderBottom: '1px solid #f1f5f9' };
  const btn = (bg, color) => ({ padding: '0.375rem 0.75rem', background: bg, color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.25rem' });
  const inp = { padding: '0.375rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.8rem', width: '100%', boxSizing: 'border-box' };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem' }}>Students</h1>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Name</th><th style={th}>Email</th><th style={th}>Level</th><th style={th}>Phone</th><th style={th}>Actions</th>
          </tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                {editing === s._id ? (<>
                  <td style={td}><input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></td>
                  <td style={td}><input style={inp} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></td>
                  <td style={td}><input style={inp} value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} /></td>
                  <td style={td}><input style={inp} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></td>
                  <td style={td}>
                    <button style={btn('#2563eb', '#fff')} onClick={() => saveEdit(s._id)}>Save</button>
                    <button style={btn('#f1f5f9', '#334155')} onClick={cancelEdit}>Cancel</button>
                  </td>
                </>) : (<>
                  <td style={td}>{s.name}</td>
                  <td style={td}>{s.email}</td>
                  <td style={td}>{s.level}</td>
                  <td style={td}>{s.phone}</td>
                  <td style={td}>
                    <button style={btn('#dbeafe', '#2563eb')} onClick={() => startEdit(s)}>Edit</button>
                    <button style={btn('#fee2e2', '#dc2626')} onClick={() => remove(s._id)}>Delete</button>
                  </td>
                </>)}
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={5} style={{ ...td, textAlign: 'center', color: '#94a3b8' }}>No students found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudents;
