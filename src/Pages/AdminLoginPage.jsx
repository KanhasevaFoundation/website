import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../apiClient';
import { User, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/admin/login', credentials);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data?.user);
        navigate('/admin');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
        <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <ShieldCheck className="text-sky-600" size={36} />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-sky-900">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-sky-300">
                <User size={18} className="text-gray-500 mr-2" />
                <input type="text" name="username" placeholder="Username" className="w-full outline-none" value={credentials.username} onChange={e => setCredentials({ ...credentials, username: e.target.value })} required autoFocus />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-sky-300">
                <Lock size={18} className="text-gray-500 mr-2" />
                <input type="password" name="password" placeholder="Password" className="w-full outline-none" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} required />
              </div>
            </div>
            {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className={`w-full py-2 px-4 rounded-lg text-white ${loading ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'} transition`}>{loading ? 'Logging in...' : 'Login'}</motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
