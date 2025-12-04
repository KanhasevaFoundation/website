import { useEffect, useState } from 'react';
import { api } from '../apiClient';
import { motion } from 'framer-motion';

const AdminSocialLinks = () => {
  const [links, setLinks] = useState({ youtube: '', instagram: '', facebook: '', twitter: '', website: '', linkedin: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/social-links');
        if (res.data) setLinks({ ...links, ...res.data });
      } catch {}
    };
    load();
  }, []);

  const onChange = (e) => setLinks({ ...links, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/api/admin/social-links', links);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ name, label }) => (
    <div className="mb-4">
      <label className="block text-sm text-sky-700 mb-1">{label}</label>
      <input
        type="url"
        inputMode="url"
        autoComplete="off"
        name={name}
        value={links[name] || ''}
        onChange={onChange}
        placeholder={`https://...`}
        className="block w-full max-w-full border rounded p-2 outline-none focus:ring-2 focus:ring-sky-300 overflow-x-auto"
        style={{ minWidth: 0 }}
      />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-sky-900 mb-4">Social Links</h1>
      <form onSubmit={onSave}>
        <Field name="youtube" label="YouTube" />
        <Field name="instagram" label="Instagram" />
        <Field name="facebook" label="Facebook" />
        <Field name="twitter" label="Twitter" />
        <Field name="website" label="Website" />
        <Field name="linkedin" label="LinkedIn" />
        {saved && <div className="text-green-600 text-sm mb-2">Saved</div>}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={saving} className={`bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded ${saving ? 'opacity-70' : ''}`}>{saving ? 'Saving...' : 'Save'}</motion.button>
      </form>
    </motion.div>
  );
};

export default AdminSocialLinks;
