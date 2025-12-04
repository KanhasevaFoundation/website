import { useEffect, useState } from 'react';
import { api } from '../apiClient';

const AdminOverview = () => {
  const [summary, setSummary] = useState({ events: 0 });
  const [counts, setCounts] = useState({ volunteers: 0 });
  useEffect(() => { (async () => {
    try { const s = await api.get('/api/analytics/summary'); setSummary(s.data || {}); } catch {}
    try { const v = await api.get('/api/volunteers'); setCounts({ volunteers: (v.data || []).length }); } catch {}
  })(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-sky-900 mb-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-sky-50 rounded shadow">
          <div className="text-sm text-gray-600">Analytics Events</div>
          <div className="text-3xl font-bold text-sky-700">{summary.totalEvents || 0}</div>
        </div>
        <div className="p-4 bg-sky-50 rounded shadow">
          <div className="text-sm text-gray-600">Volunteers</div>
          <div className="text-3xl font-bold text-sky-700">{counts.volunteers}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
