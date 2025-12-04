import { useEffect, useState } from 'react';
import { api } from '../apiClient';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', assignedToType: 'volunteer', assignedToId: '', dueDate: '' });
  const [volunteers, setVolunteers] = useState([]);

  const loadTasks = async () => { try { const res = await api.get('/api/admin/tasks'); setTasks(res.data || []); } catch {} };
  const loadVolunteers = async () => { try { const res = await api.get('/api/volunteers'); setVolunteers(res.data || []); } catch {} };
  useEffect(() => { loadTasks(); loadVolunteers(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await api.post('/api/admin/tasks', form); setForm({ title: '', description: '', assignedToType: 'volunteer', assignedToId: '', dueDate: '' }); await loadTasks(); } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-sky-900 mb-4">Tasks</h1>
      <form onSubmit={onSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="border rounded p-2" required />
        <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="border rounded p-2" />
        <select value={form.assignedToType} onChange={e=>setForm({...form,assignedToType:e.target.value})} className="border rounded p-2">
          <option value='volunteer'>Volunteer</option>
          <option value='admin'>Admin</option>
        </select>
        <select value={form.assignedToId} onChange={e=>setForm({...form,assignedToId:e.target.value})} className="border rounded p-2" required>
          <option value=''>Select Volunteer</option>
          {volunteers.filter(v=>v.status==='approved').map(v=> (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>
        <input type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})} className="border rounded p-2" />
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Create Task</button>
      </form>
      <ul className="divide-y">
        {tasks.map(t => (
          <li key={t._id} className="py-2 flex items-center justify-between">
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-gray-600">{t.description}</div>
            </div>
            <select value={t.status} onChange={async e=>{ await api.put(`/api/admin/tasks/${t._id}`, { status: e.target.value }); await loadTasks(); }} className="border rounded p-2">
              <option value='pending'>Pending</option>
              <option value='done'>Done</option>
            </select>
          </li>
        ))}
        {!tasks.length && <li className="py-2 text-gray-500">No tasks</li>}
      </ul>
    </div>
  );
};

export default AdminTasks;
