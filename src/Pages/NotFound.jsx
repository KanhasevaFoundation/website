import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <Helmet>
        <title>Page Not Found – Kanhaseva</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <motion.h1
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-5xl font-bold text-sky-800 mb-3"
      >
        404
      </motion.h1>
      <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded transition"
      >
        Go Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
