import React, { useEffect, useState } from 'react';
import adminApi from '../../utils/adminApi';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const load = () => adminApi.get('contacts').then(setContacts).catch(() => {});
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await adminApi.del(`contacts/${id}`);
    load();
  };

  const th = { padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' };
  const td = { padding: '0.75rem', fontSize: '0.875rem', color: '#334155', borderBottom: '1px solid #f1f5f9' };
  const btn = (bg, color) => ({ padding: '0.375rem 0.75rem', background: bg, color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 });

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem' }}>Contact Messages</h1>
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>
            <th style={th}>Name</th><th style={th}>Email</th><th style={th}>Message</th><th style={th}>Date</th><th style={th}>Actions</th>
          </tr></thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td style={td}>{c.name}</td>
                <td style={td}>{c.email}</td>
                <td style={{ ...td, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                <td style={td}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '-'}</td>
                <td style={td}>
                  <button style={btn('#fee2e2', '#dc2626')} onClick={() => remove(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && <tr><td colSpan={5} style={{ ...td, textAlign: 'center', color: '#94a3b8' }}>No messages found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContacts;
