import "@fortawesome/fontawesome-free/css/all.min.css";

// Social Media Links Component
const SocialMediaLinks = () => {
  const socialLinks = [
    { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
    { href: "https://www.youtube.com/@KanhasevaFoundation", icon: "fab fa-youtube", label: "Twitter" },
    { href: "https://www.instagram.com/kanhaseva.in/", icon: "fab fa-instagram", label: "Instagram" },
    { href: "https://linkedin.com", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  ];

  return (
    <div className="flex space-x-6">
      {socialLinks.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-sky-700 hover:text-sky-900 hover:scale-110 transition-transform text-2xl"
        >
          <i className={icon}></i>
        </a>
      ))}
    </div>
  );
};

// Quick Links Component
const QuickLinks = () => {
  const links = [
    { href: "/about", text: "About Us" },
    { href: "/programs", text: "Our Programs" },
    { href: "/contact", text: "Contact Us" },
    { href: "/donate", text: "Donate" },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full lg:w-1/3">
      <h2 className="text-lg font-bold text-sky-900">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        {links.map(({ href, text }) => (
          <li key={text}>
            <a href={href} className="text-sky-700 hover:text-sky-900 hover:underline">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-sky-100 text-sky-900 pt-10 pb-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0 lg:space-x-10">
        
        {/* About Section */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/3">
          <h2 className="text-lg font-bold text-sky-900">About KanhaSeva.in</h2>
          <p className="text-sm text-sky-700">
            At KanhaSeva.in, we are dedicated to serving cows and helping the underprivileged. Our mission is to provide nourishment to cows and support poor communities through donations and volunteer efforts. Join us in making a difference!
          </p>
        </div>

        {/* Quick Links Section */}
        <QuickLinks />

        {/* Social Media & Call to Action */}
        <div className="flex flex-col items-center lg:items-start space-y-6 w-full lg:w-1/3">
          <h2 className="text-lg font-bold text-sky-900">Connect with Us</h2>
          <SocialMediaLinks />
          <button className="mt-4 bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-md shadow-md transition-all hover:scale-105">
            Donate Now
          </button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-sky-200 pt-4 text-center text-sm text-sky-700">
        &copy; {new Date().getFullYear()} KanhaSeva.in. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;