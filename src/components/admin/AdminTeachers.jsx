import React, { useEffect, useState, useRef } from 'react';
import adminApi from '../../utils/adminApi';

const empty = { name: '', email: '', phone: '', specialization: '', bio: '', image: '', experience: '' };
const API = 'http://localhost:3000';

const ImageUploader = ({ value, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) uploadFile(file);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        uploadFile(item.getAsFile());
        break;
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) uploadFile(file);
    e.target.value = '';
  };

  const imgSrc = value ? (value.startsWith('/uploads') ? `${API}${value}` : value) : '';

  if (value) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '10px', background: '#f8fafc' }}>
        <img src={imgSrc} alt="Teacher" style={{ width: 64, height: 64, borderRadius: '10px', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Image uploaded</p>
          <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#94a3b8', wordBreak: 'break-all' }}>{value}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={() => fileRef.current?.click()}
            style={{ padding: '4px 10px', fontSize: '0.7rem', fontWeight: 600, color: '#2563eb', background: '#dbeafe', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Change
          </button>
          <button onClick={() => onChange('')}
            style={{ padding: '4px 10px', fontSize: '0.7rem', fontWeight: 600, color: '#dc2626', background: '#fee2e2', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Remove
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />
      </div>
    );
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onPaste={handlePaste}
      tabIndex={0}
      style={{
        border: `2px dashed ${dragging ? '#2563eb' : '#cbd5e1'}`,
        borderRadius: '12px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        background: dragging ? '#eff6ff' : '#f8fafc',
        transition: 'all 0.2s',
        cursor: 'pointer',
        outline: 'none',
      }}
      onClick={() => fileRef.current?.click()}
    >
      {uploading ? (
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>Uploading...</p>
      ) : (
        <>
          <div style={{ marginBottom: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>
            Drop, Upload or Paste Image
          </p>
          <p style={{ margin: '0 0 12px', fontSize: '0.72rem', color: '#94a3b8' }}>
            Supported formats: JPG, PNG, GIF, JFIF, HEIC, WEBP
          </p>
          <button type="button" onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
            style={{ padding: '8px 20px', fontSize: '0.8rem', fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Browse Files
          </button>
        </>
      )}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/gif,image/jfif,image/heic,image/webp" hidden onChange={handleFileSelect} />
    </div>
  );
};

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);

  const load = () => adminApi.get('teachers').then(setTeachers).catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async () => {
    try {
      const data = { ...form, experience: Number(form.experience) || undefined };
      if (editing) { await adminApi.put(`teachers/${editing}`, data); }
      else { await adminApi.post('teachers', data); }
      setForm(empty); setEditing(null); setShowForm(false);
      load();
    } catch (err) {
      alert('Failed to save: ' + err.message);
    }
  };

  const startEdit = (t) => {
    setEditing(t._id);
    setForm({ name: t.name || '', email: t.email || '', phone: t.phone || '', specialization: t.specialization || '', bio: t.bio || '', image: t.image || '', experience: t.experience || '' });
    setShowForm(true);
  };

  const startAdd = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const cancel = () => { setEditing(null); setShowForm(false); setForm(empty); };
  const remove = async (id) => { if (!window.confirm('Delete this teacher?')) return; await adminApi.del(`teachers/${id}`); load(); };

  const th = { padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' };
  const td = { padding: '0.75rem', fontSize: '0.875rem', color: '#334155', borderBottom: '1px solid #f1f5f9' };
  const btnS = (bg, color) => ({ padding: '0.375rem 0.75rem', background: bg, color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.25rem' });
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' };
  const inputStyle = { width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', boxSizing: 'border-box' };
  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  const getImgSrc = (image) => image ? (image.startsWith('/uploads') ? `${API}${image}` : image) : '';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Teachers ({teachers.length})</h1>
        {!showForm && <button style={btnS('#2563eb', '#fff')} onClick={startAdd}>+ Add Teacher</button>}
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>
            {editing ? 'Edit Teacher' : 'Add New Teacher'}
          </h3>
          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Sir Abdul Hafeez" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="e.g. hafeez@homeacademy.com" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="e.g. +92 300 1234567" />
            </div>
            <div>
              <label style={labelStyle}>Specialization</label>
              <input style={inputStyle} value={form.specialization} onChange={e => set('specialization', e.target.value)} placeholder="e.g. Grammar & Structure" />
            </div>
            <div>
              <label style={labelStyle}>Experience (years)</label>
              <input style={inputStyle} type="number" value={form.experience} onChange={e => set('experience', e.target.value)} placeholder="e.g. 15" />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={labelStyle}>Teacher Image</label>
            <ImageUploader value={form.image} onChange={v => set('image', v)} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={labelStyle}>Bio</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Short bio about the teacher..." />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={submit} style={{ padding: '0.6rem 1.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              {editing ? 'Update Teacher' : 'Add Teacher'}
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
            <th style={th}>Teacher</th>
            <th style={th}>Email</th>
            <th style={th}>Specialization</th>
            <th style={th}>Experience</th>
            <th style={th}>Actions</th>
          </tr></thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t._id} style={{ background: editing === t._id ? '#eff6ff' : 'transparent' }}>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {t.image ? (
                      <img src={getImgSrc(t.image)} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                        onError={e => { e.target.style.display = 'none'; }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                        {t.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.bio}</div>
                    </div>
                  </div>
                </td>
                <td style={td}>{t.email}</td>
                <td style={td}>
                  <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600, background: '#f1f5f9', color: '#475569' }}>{t.specialization}</span>
                </td>
                <td style={td}>{t.experience} yrs</td>
                <td style={td}>
                  <button style={btnS('#dbeafe', '#2563eb')} onClick={() => startEdit(t)}>Edit</button>
                  <button style={btnS('#fee2e2', '#dc2626')} onClick={() => remove(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && <tr><td colSpan={5} style={{ ...td, textAlign: 'center', color: '#94a3b8' }}>No teachers found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTeachers;
