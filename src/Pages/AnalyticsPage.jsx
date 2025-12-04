import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../apiClient';

const AnalyticsPage = () => {
  const [summary, setSummary] = useState({ grouped: [], totals: [] });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, e] = await Promise.all([
          api.get('/api/analytics/summary'),
          api.get('/api/analytics/events?limit=100'),
        ]);
        setSummary(s.data);
        setEvents(e.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const countFor = (type) => summary.totals.find(t => t._id === type)?.count || 0;

  return (
    <div className="p-6">
      <Helmet>
        <title>Analytics – Admin</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://kanhasevain.vercel.app/analytics" />
      </Helmet>
      <h1 className="text-3xl font-bold text-sky-900 mb-6">Website Analytics</h1>
      {loading ? (
        <div className="animate-pulse h-24 bg-gray-200 rounded" />
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Total Page Views</div>
            <div className="text-2xl font-bold text-sky-700">{countFor('page_view')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Total Clicks</div>
            <div className="text-2xl font-bold text-sky-700">{countFor('click')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">Tracked Paths</div>
            <div className="text-2xl font-bold text-sky-700">{new Set(summary.grouped.map(g => g._id.path)).size}</div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold text-sky-900 mb-2">By Path</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-50">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Path</th>
              <th className="px-4 py-2 text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {summary.grouped.map((row, idx) => (
              <tr key={idx} className={idx % 2 ? 'bg-gray-50' : ''}>
                <td className="px-4 py-2">{row._id.type}</td>
                <td className="px-4 py-2">{row._id.path}</td>
                <td className="px-4 py-2 text-right">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-sky-900 mb-2">Recent Events</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-50">
            <tr>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Path</th>
              <th className="px-4 py-2 text-left">Element</th>
              <th className="px-4 py-2 text-left">Referrer</th>
            </tr>
          </thead>
          <tbody>
            {events.map(evt => (
              <tr key={evt._id} className="border-t">
                <td className="px-4 py-2">{new Date(evt.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{evt.type}</td>
                <td className="px-4 py-2">{evt.path}</td>
                <td className="px-4 py-2">{evt.element || '-'}</td>
                <td className="px-4 py-2">{evt.referrer || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsPage;
