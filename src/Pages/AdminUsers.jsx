import { useEffect, useState } from 'react';
import { api } from '../apiClient';
import { motion } from 'framer-motion';

const AdminUsers = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', enabled: false, role: 'admin', permissions: { donors:false, volunteers:false, analytics:false, socialLinks:false, menuVisibility:false, adminUsers:false } });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [permModalOpen, setPermModalOpen] = useState(false);
  const [permUser, setPermUser] = useState(null);
  const [permState, setPermState] = useState({ donors:false, volunteers:false, analytics:false, socialLinks:false, menuVisibility:false, adminUsers:false });

  const load = async () => {
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.data || []);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    if (currentUser?.role !== 'admin') {
      setError('Only admin can create admin users');
      setSaving(false);
      return;
    }
    try {
      await api.post('/api/admin/users', form);
      setForm({ username: '', password: '', enabled: false, role: 'admin', permissions: { donors:false, volunteers:false, analytics:false, socialLinks:false, menuVisibility:false, adminUsers:false } });
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-sky-900 mb-4">Admin Users</h1>
      {currentUser?.role === 'admin' && (
        <div className="mb-6">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowModal(true)} className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Create User</motion.button>
        </div>
      )}

      {showModal && currentUser?.role === 'admin' && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-sky-900 mb-4">New User</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="block text-sm text-sky-700 mb-1">Username</label>
                <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full border rounded p-2 outline-none" required />
              </div>
              <div className="mb-3">
                <label className="block text-sm text-sky-700 mb-1">Password</label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border rounded p-2 outline-none" required />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-sky-700 mb-1">Enable account</label>
                <input type="checkbox" checked={form.enabled} onChange={e => setForm({ ...form, enabled: e.target.checked })} />
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {Object.keys(form.permissions).map(k => (
                  <label key={k} className="text-sm flex items-center gap-2">
                    <input type="checkbox" checked={form.permissions[k]} onChange={e => setForm({ ...form, permissions: { ...form.permissions, [k]: e.target.checked } })} />
                    <span className="capitalize">{k}</span>
                  </label>
                ))}
              </div>
              {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={saving} className={`bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded ${saving ? 'opacity-70' : ''}`}>{saving ? 'Creating...' : 'Save'}</motion.button>
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold text-sky-900 mb-2">Existing Admins</h2>
      <ul className="divide-y">
        {users.map(u => (
          <li key={u._id} className="py-2 flex items-center justify-between">
            <span>{u.username}</span>
            {currentUser?.role === 'admin' && (
            <button
              onClick={async () => {
                if (!confirm(`Delete admin '${u.username}'?`)) return;
                setSaving(true); setError('');
                try {
                  await api.delete(`/api/admin/users/${u._id}`);
                  await load();
                } catch (err) {
                  setError(err.response?.data?.message || 'Failed to delete user');
                } finally { setSaving(false); }
              }}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
            )}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Role {u.role || 'user'}</span>
              {currentUser?.role === 'admin' && (
                <>
                  <label className="text-sm flex items-center gap-1">
                    <input type="checkbox" checked={u.enabled !== false} onChange={async (e) => {
                      setSaving(true);
                      try { await api.put(`/api/admin/users/${u._id}`, { enabled: e.target.checked }); await load(); } finally { setSaving(false); }
                    }} />
                    Enabled
                  </label>
                  <button
                    onClick={() => {
                      const base = { donors:false, volunteers:false, analytics:false, socialLinks:false, menuVisibility:false, adminUsers:false };
                      setPermUser(u);
                      setPermState({ ...base, ...(u.permissions || {}) });
                      setPermModalOpen(true);
                    }}
                    className="text-sky-600 hover:text-sky-800 text-sm"
                  >
                    Set Permissions
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
        {!users.length && <li className="py-2 text-gray-500">No admin users yet</li>}
      </ul>
      {permModalOpen && permUser && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-sky-900 mb-4">Permissions for {permUser.username}</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.keys(permState).map(k => (
                <label key={k} className="text-sm flex items-center gap-2">
                  <input type="checkbox" checked={!!permState[k]} onChange={e => setPermState({ ...permState, [k]: e.target.checked })} />
                  <span className="capitalize">{k}</span>
                </label>
              ))}
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={saving} onClick={async () => {
                setSaving(true); setError('');
                try { await api.put(`/api/admin/users/${permUser._id}`, { permissions: permState }); setPermModalOpen(false); await load(); } catch (err) { setError(err.response?.data?.message || 'Failed to update permissions'); } finally { setSaving(false); }
              }} className={`bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded ${saving ? 'opacity-70' : ''}`}>{saving ? 'Saving...' : 'Save'}</motion.button>
              <button type="button" onClick={() => setPermModalOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminUsers;
