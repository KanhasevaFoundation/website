import { useEffect, useState } from 'react';
import { api } from '../apiClient';
import { motion } from 'framer-motion';

const AdminMenuVisibility = () => {
  const [menu, setMenu] = useState({ home: true, gallery: true, volunteers: true, donate: true });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/settings');
        if (res.data?.menuVisibility) setMenu(res.data.menuVisibility);
      } catch {}
    })();
  }, []);

  const onToggle = (key) => setMenu({ ...menu, [key]: !menu[key] });

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true); setSaved(false);
    try {
      await api.put('/api/admin/settings', { menuVisibility: menu });
      setSaved(true);
    } finally { setSaving(false); }
  };

  const Row = ({ keyName, label }) => (
    <label className="flex items-center justify-between py-2 border-b">
      <span className="text-sky-900">{label}</span>
      <input type="checkbox" checked={!!menu[keyName]} onChange={() => onToggle(keyName)} />
    </label>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-sky-900 mb-4">Menu Visibility</h1>
      <form onSubmit={onSave}>
        <Row keyName="home" label="Home" />
        <Row keyName="gallery" label="Gallery" />
        <Row keyName="volunteers" label="Volunteers" />
        <Row keyName="donate" label="Donate" />
        {saved && <div className="text-green-600 text-sm mt-2">Saved</div>}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={saving} className={`mt-4 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded ${saving ? 'opacity-70' : ''}`}>{saving ? 'Saving...' : 'Save'}</motion.button>
      </form>
    </motion.div>
  );
};

export default AdminMenuVisibility;
