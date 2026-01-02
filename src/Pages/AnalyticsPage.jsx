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
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <Helmet>
        <title>Analytics – Admin</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://kanhasevain.vercel.app/analytics" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-6 px-6 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Website Analytics</h1>
        <p className="text-sky-100 mt-1">Deep dive into visitor interactions</p>
      </div>

      {loading ? (
        <div className="animate-pulse h-24 bg-gray-200 rounded" />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sky-500">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Page Views</div>
            <div className="text-3xl font-bold text-sky-700">{countFor('page_view')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Clicks</div>
            <div className="text-3xl font-bold text-indigo-700">{countFor('click')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
            <div className="text-sm font-medium text-gray-500 mb-1">Unique Paths</div>
            <div className="text-3xl font-bold text-emerald-700">{new Set(summary.grouped.map(g => g._id.path)).size}</div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* By Path Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Traffic by Path</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-sky-50 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Path</th>
                  <th className="px-6 py-3 text-right">Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {summary.grouped.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-600">{row._id.type}</td>
                    <td className="px-6 py-3 text-gray-800">{row._id.path}</td>
                    <td className="px-6 py-3 text-right font-bold text-sky-600">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Events Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity Log</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-sky-50 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Time</th>
                  <th className="px-6 py-3 text-left">Event</th>
                  <th className="px-6 py-3 text-left">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.slice(0, 10).map(evt => (
                  <tr key={evt._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-500 font-mono text-xs">{new Date(evt.createdAt).toLocaleTimeString()}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${evt.type === 'page_view' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {evt.type}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-700 truncate max-w-xs" title={evt.path}>
                      {evt.path} {evt.element && `(${evt.element})`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
