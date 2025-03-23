import { FaYoutube, FaTwitter, FaInstagram, FaGlobe, FaFacebook } from "react-icons/fa";

const SocialSection = () => (
  <section className="text-center p-8 bg-sky-50">
    <h3 className="text-2xl font-bold text-sky-900 mb-6">Connect With Us</h3>
    <div className="flex justify-center gap-6">
      {/* YouTube */}
      <a
        href="https://www.youtube.com/@KanhasevaFoundation"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform"
      >
        <FaYoutube className="text-red-600 text-2xl" />
      </a>

      {/* Twitter */}
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform"
      >
        <FaTwitter className="text-blue-400 text-2xl" />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/kanhaseva.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform"
      >
        <FaInstagram className="text-pink-500 text-2xl" />
      </a>

      {/* Website */}
      <a
        href="https://www.kanhaseva.in"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform"
      >
        <FaGlobe className="text-sky-600 text-2xl" />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform"
      >
        <FaFacebook className="text-blue-600 text-2xl" />
      </a>
    </div>
  </section>
);

export default SocialSection;