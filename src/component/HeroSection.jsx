import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate");
  };

  // Cloudinary URL for the banner image
  const bannerImage = "https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto/zyl1uaew9acfn6jxkhvy";

  return (
    <section className="w-full flex justify-center py-8 bg-sky-50">
      <div className="w-11/12 relative rounded-xl shadow-2xl overflow-hidden">
        {/* Banner Image */}
        <img
          src={bannerImage}
          alt="KanhaSeva.in Banner"
          className="w-full h-[360px] md:h-[480px] object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center text-center p-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Feed Cows, Help the Poor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md"
          >
            Join us in our mission to provide nourishment to cows and support underprivileged communities. Together, we can make a difference.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDonateClick}
            className="bg-sky-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all"
          >
            Donate Now
          </motion.button>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
