import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../apiClient';

const VolunteerDashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => { (async () => { try { const res = await api.get(`/api/tasks?assignedToType=volunteer&assignedToId=${user?.id}`); setTasks(res.data || []); } catch {} })(); }, [user?.id]);

  return (
    <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
      <aside className="md:col-span-1 bg-white rounded-lg shadow p-4">
        <nav className="flex flex-col space-y-2">
          <NavLink to="#" className="px-3 py-2 rounded bg-sky-600 text-white">Tasks</NavLink>
          <NavLink to="#" className="px-3 py-2 rounded hover:bg-sky-100 text-sky-900">Profile</NavLink>
        </nav>
      </aside>
      <main className="md:col-span-4 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold text-sky-900 mb-3">My Tasks</h2>
        <ul className="divide-y">
          {tasks.map(t => (
            <li key={t._id} className="py-2">
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-gray-600">{t.description}</div>
              <div className="text-xs text-gray-500">{t.status}</div>
            </li>
          ))}
          {!tasks.length && <li className="py-2 text-gray-500">No tasks assigned</li>}
        </ul>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
