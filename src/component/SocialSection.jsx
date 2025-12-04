import { FaYoutube, FaTwitter, FaInstagram, FaGlobe, FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../apiClient";

const SocialSection = () => {
  const [links, setLinks] = useState({});
  useEffect(() => { (async () => { try { const res = await api.get('/api/social-links'); setLinks(res.data || {}); } catch {} })(); }, []);
  const hrefs = {
    youtube: links.youtube || "https://www.youtube.com/@KanhasevaFoundation",
    twitter: links.twitter || "https://www.twitter.com",
    instagram: links.instagram || "https://www.instagram.com/kanhaseva.in/",
    website: links.website || "https://www.kanhaseva.in",
    facebook: links.facebook || "https://www.facebook.com",
  };
  return (
    <section className="text-center p-8 bg-sky-50">
      <h3 className="text-2xl font-bold text-sky-900 mb-6">Connect With Us</h3>
      <div className="flex justify-center gap-6">
        <a href={hrefs.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
          <FaYoutube className="text-red-600 text-2xl" />
        </a>
        <a href={hrefs.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
          <FaTwitter className="text-blue-400 text-2xl" />
        </a>
        <a href={hrefs.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
          <FaInstagram className="text-pink-500 text-2xl" />
        </a>
        <a href={hrefs.website} target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
          <FaGlobe className="text-sky-600 text-2xl" />
        </a>
        <a href={hrefs.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full p-4 bg-white shadow-lg hover:scale-105 transition-transform">
          <FaFacebook className="text-blue-600 text-2xl" />
        </a>
      </div>
    </section>
  );
};

export default SocialSection;
