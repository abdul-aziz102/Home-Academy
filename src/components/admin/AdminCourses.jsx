import React, { useEffect, useState } from 'react';
import adminApi from '../../utils/adminApi';

const empty = { title: '', description: '', level: '', duration: '', price: '', classes: '', skills: '', badge: '', accent: '' };

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);

  const load = () => adminApi.get('courses').then(setCourses).catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async () => {
    try {
      const data = {
        ...form,
        price: Number(form.price),
        classes: Number(form.classes) || undefined,
        skills: typeof form.skills === 'string' ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : form.skills,
      };
      if (editing) { await adminApi.put(`courses/${editing}`, data); }
      else { await adminApi.post('courses', data); }
      setForm(empty); setEditing(null); setShowForm(false);
      load();
    } catch (err) {
      alert('Failed to save: ' + err.message);
    }
  };

  const startEdit = (c) => {
    setEditing(c._id);
    setForm({
      title: c.title || '', description: c.description || '', level: c.level || '',
      duration: c.duration || '', price: c.price || '', classes: c.classes || '',
      skills: (c.skills || []).join(', '), badge: c.badge || '', accent: c.accent || '',
    });
    setShowForm(true);
  };

  const startAdd = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const cancel = () => { setEditing(null); setShowForm(false); setForm(empty); };
  const remove = async (id) => { if (!window.confirm('Delete this course?')) return; await adminApi.del(`courses/${id}`); load(); };

  const th = { padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' };
  const td = { padding: '0.75rem', fontSize: '0.875rem', color: '#334155', borderBottom: '1px solid #f1f5f9' };
  const btnS = (bg, color) => ({ padding: '0.375rem 0.75rem', background: bg, color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.25rem' });

  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' };
  const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', boxSizing: 'border-box' };
  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Courses ({courses.length})</h1>
        {!showForm && <button style={btnS('#2563eb', '#fff')} onClick={startAdd}>+ Add Course</button>}
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
            {editing ? 'Edit Course' : 'Add New Course'}
          </h3>
          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Pre-Beginner" />
            </div>
            <div>
              <label style={labelStyle}>Level / Category *</label>
              <select style={inputStyle} value={form.level} onChange={e => set('level', e.target.value)}>
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Elementary">Elementary</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Duration *</label>
              <input style={inputStyle} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 12 weeks" />
            </div>
            <div>
              <label style={labelStyle}>Price (Rs.) *</label>
              <input style={inputStyle} type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 3200" />
            </div>
            <div>
              <label style={labelStyle}>Classes per week</label>
              <input style={inputStyle} type="number" value={form.classes} onChange={e => set('classes', e.target.value)} placeholder="e.g. 5" />
            </div>
            <div>
              <label style={labelStyle}>Badge Label</label>
              <input style={inputStyle} value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="e.g. CEFR A1, START HERE" />
            </div>
            <div>
              <label style={labelStyle}>Accent Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input style={{ ...inputStyle, flex: 1 }} value={form.accent} onChange={e => set('accent', e.target.value)} placeholder="e.g. #3b82f6" />
                <input type="color" value={form.accent || '#3b82f6'} onChange={e => set('accent', e.target.value)} style={{ width: '36px', height: '36px', border: 'none', cursor: 'pointer', borderRadius: '6px' }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Skills (comma separated)</label>
              <input style={inputStyle} value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="e.g. Past tenses, Writing emails" />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={labelStyle}>Description *</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Course description..." />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={submit} style={{ padding: '0.6rem 1.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              {editing ? 'Update Course' : 'Add Course'}
            </button>
            <button onClick={cancel} style={{ padding: '0.6rem 1.5rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Title</th>
            <th style={th}>Level</th>
            <th style={th}>Badge</th>
            <th style={th}>Duration</th>
            <th style={th}>Price</th>
            <th style={th}>Skills</th>
            <th style={th}>Actions</th>
          </tr></thead>
          <tbody>
            {courses.map(c => (
              <tr key={c._id} style={{ background: editing === c._id ? '#eff6ff' : 'transparent' }}>
                <td style={td}>
                  <div style={{ fontWeight: 600 }}>{c.title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.description}</div>
                </td>
                <td style={td}>
                  <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600, background: '#f1f5f9', color: '#475569' }}>{c.level}</span>
                </td>
                <td style={td}>
                  <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', border: `1px solid ${c.accent || '#cbd5e1'}33`, color: c.accent || '#64748b' }}>{c.badge}</span>
                </td>
                <td style={td}>{c.duration}</td>
                <td style={td}>Rs. {c.price?.toLocaleString()}</td>
                <td style={{ ...td, maxWidth: '180px', fontSize: '0.75rem', color: '#64748b' }}>{(c.skills || []).join(', ')}</td>
                <td style={td}>
                  <button style={btnS('#dbeafe', '#2563eb')} onClick={() => startEdit(c)}>Edit</button>
                  <button style={btnS('#fee2e2', '#dc2626')} onClick={() => remove(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && <tr><td colSpan={7} style={{ ...td, textAlign: 'center', color: '#94a3b8' }}>No courses found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;
