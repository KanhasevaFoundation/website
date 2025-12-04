import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import AboutUs from './Pages/AboutUs';
import Programs from './Pages/Programs';
import VolunteerPage from './Pages/VolunteerPage';
import VolunteerList from './Pages/volunteersListPage';
import DonationPage from './Pages/DoantePage'
import AdminDonorPage from './Pages/DonorsPage';
// import ContactUs from './pages/ContactUs';
// import Gallery from './pages/Gallery';
import Navbar from './component/Navbar';
import TermsPage from './Pages/Termspage';
import Footer from './component/Footer';
import ContactUs from './Pages/ContactUs';
import VideosAndImagesPage from './Pages/VideoImagesPage';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './component/PageTransition';
import AnalyticsPage from './Pages/AnalyticsPage';
import SupportSeva from './Pages/SupportSeva';
import { useEffect } from 'react';
import { trackPageView } from './analytics';
import NotFound from './Pages/NotFound';
import AdminSocialLinks from './Pages/AdminSocialLinks';
import AdminMenuVisibility from './Pages/AdminMenuVisibility';
import AdminUsers from './Pages/AdminUsers';
import AdminDashboard from './Pages/AdminDashboard';
import VolunteerDashboard from './Pages/VolunteerDashboard';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminOverview from './Pages/AdminOverview';
import { api } from './apiClient';

function AnimatedRoutes({ isAuthenticated, handleLogin, currentUser }) {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><AdminLoginPage onLogin={handleLogin} /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Programs /></PageTransition>} />
        <Route path='/volunteers' element={<PageTransition><VolunteerPage /></PageTransition>} />
        <Route path='/donate' element={<PageTransition><DonationPage /></PageTransition>} />
        <Route path='/contact' element={<PageTransition><ContactUs /></PageTransition>} />
        <Route path='/gallery' element={<PageTransition><VideosAndImagesPage /></PageTransition>} />
        <Route path='/admin/login' element={<PageTransition><AdminLoginPage onLogin={handleLogin} /></PageTransition>} />
        <Route
          path='/admin/*'
          element={
            <PageTransition>
              {isAuthenticated ? <AdminDashboard user={currentUser} /> : <LoginPage onLogin={handleLogin} />}
            </PageTransition>
          }
        >
          <Route path='social-links' element={<AdminSocialLinks />} />
          <Route path='settings/menu' element={<AdminMenuVisibility />} />
          <Route path='users' element={<AdminUsers currentUser={currentUser} />} />
          <Route path='donors' element={<AdminDonorPage />} />
          <Route path='volunteers' element={<VolunteerList />} />
          <Route path='analytics' element={<AnalyticsPage />} />
          <Route index element={<AdminOverview />} />
        </Route>
        <Route
          path='/analytics'
          element={
            <PageTransition>
              {isAuthenticated ? <AnalyticsPage /> : <LoginPage onLogin={handleLogin} />}
            </PageTransition>
          }
        />
        <Route path='/support' element={<PageTransition><SupportSeva /></PageTransition>} />
        <Route path='/user' element={<PageTransition><VolunteerDashboard user={currentUser} /></PageTransition>} />
        <Route
          path="/volunteers-list"
          element={
            <PageTransition>
              {isAuthenticated ? <VolunteerList /> : <LoginPage onLogin={handleLogin} />}
            </PageTransition>
          }
        />
        <Route
          path="/donors"
          element={
            <PageTransition>
              {isAuthenticated ? <AdminDonorPage /> : <LoginPage onLogin={handleLogin} />}
            </PageTransition>
          }
        />
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user || null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log(setIsAuthenticated);

  };

  useEffect(() => {
    const ping = () => { api.get('/api/ping').catch(() => {}); };
    ping();
    const id = setInterval(ping, 120000);
    return () => clearInterval(id);
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <AnimatedRoutes isAuthenticated={isAuthenticated} handleLogin={handleLogin} currentUser={currentUser} />
      <Footer />
    </Router>
  );
}

export default App;
