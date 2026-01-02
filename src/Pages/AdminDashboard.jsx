import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = ({ user }) => {
  const p = (user && user.permissions) || {};
  const baseItems = [
    { to: '/admin', label: 'Dashboard', key: 'overview', always: true },
    { to: '/admin/donors', label: 'Donors', key: 'donors' },
    { to: '/admin/volunteers', label: 'Volunteers', key: 'volunteers' },
    { to: '/admin/analytics', label: 'Analytics', key: 'analytics' },
    { to: '/admin/social-links', label: 'Social Links', key: 'socialLinks' },
    { to: '/admin/settings/menu', label: 'Menu Visibility', key: 'menuVisibility' },
    { to: '/admin/users', label: 'Admin Users', key: 'adminUsers' },
  ];
  const items = (user?.role === 'admin') ? baseItems : baseItems.filter(i => i.always || p[i.key]);

  return (
    <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
      <aside className="md:col-span-1 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold text-sky-900 mb-3">Admin</h2>
        <nav className="flex flex-col space-y-2">
          {items.length ? items.map(i => (
            <NavLink key={i.to} to={i.to} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? 'bg-sky-600 text-white' : 'hover:bg-sky-100 text-sky-900'}`}>{i.label}</NavLink>
          )) : (
            <div className="text-sm text-gray-600">No permissions assigned</div>
          )}
        </nav>
      </aside>
      <main className="md:col-span-4 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[85vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
