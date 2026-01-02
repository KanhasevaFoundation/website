import { useEffect, useState } from 'react';
import { api } from '../apiClient';
import { DollarSign, Users, Activity, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 border-l-4" style={{ borderColor: color }}>
    <div className="p-3 rounded-full bg-opacity-20" style={{ backgroundColor: `${color}33` }}>
      <Icon size={24} style={{ color }} />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalDonors: 0,
    totalTransactions: 0,
    successfulTransactions: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/admin/stats');
        setStats(res.data);
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-sky-900">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="#16a34a" // Green
        />
        <StatCard
          title="Active Donors"
          value={stats.totalDonors}
          icon={Users}
          color="#2563eb" // Blue
        />
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon={Activity}
          color="#9333ea" // Purple
        />
        <StatCard
          title="Successful Txns"
          value={stats.successfulTransactions}
          icon={CheckCircle}
          color="#0891b2" // Cyan
        />
        <StatCard
          title="Total Website Visits"
          value={stats.totalVisits || 0}
          icon={Activity}
          color="#f43f5e" // Rose
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <p className="text-gray-500">Select an item from the sidebar to manage specific resources.</p>
      </div>
    </div>
  );
};

export default AdminOverview;
