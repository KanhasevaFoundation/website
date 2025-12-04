import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { api } from "../apiClient";
import { CircleUserRound } from 'lucide-react';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [menu, setMenu] = useState({ home: true, gallery: true, volunteers: true, donate: true });

  const logo = "/web-logo.png";
  // Toggle Profile Menu
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/settings');
        if (res.data?.menuVisibility) setMenu(res.data.menuVisibility);
      } catch {}
    })();
  }, []);

  return (
    <nav className="bg-sky-100 text-sky-900 px-6 py-4 shadow-md font-[Poppins]">
      <div className="flex justify-between items-center">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="kanhaseva.in logo" className="w-10 h-10 rounded-full" />
          <Link to="/" className="text-xl font-bold hover:text-sky-700">
            kanhaseva.in
          </Link>
        </div>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-6 text-medium">
          {menu.home && <NavItem to="/" text="Home" />}
          {menu.gallery && <NavItem to="/gallery" text="Gallery" />}
          {menu.volunteers && <NavItem to="/volunteers" text="Volunteers" />}
          {menu.donate && <NavItem to="/donate" text="Donate" />}
        </div>

        {/* Right: Profile/Login */}
        <div className="relative" ref={profileMenuRef}>
          {isAuthenticated ? (
            <button
              onClick={toggleProfileMenu}
              className="text-lg font-semibold hover:text-sky-700 focus:outline-none"
            >
              <CircleUserRound />
            </button>
          ) : (
            <Link to="/admin/login" className="bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600">
              Admin Login
            </Link>
          )}

          {/* Profile Dropdown */}
          {isAuthenticated && isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-sky-900 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onLogout();
                  setProfileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-sky-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-3xl focus:outline-none hover:text-sky-700"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-sky-200 rounded-lg py-3">
          {menu.home && <NavItem to="/" text="Home" mobile />}
          {menu.gallery && <NavItem to="/gallery" text="Gallery" mobile />}
          {menu.volunteers && <NavItem to="/volunteers" text="Volunteers" mobile />}
          {menu.donate && <NavItem to="/donate" text="Donate" mobile />}
        </div>
      )}
    </nav>
  );
};

// Reusable Navigation Item with Hover Effect
const NavItem = ({ to, text, mobile = false }) => (
  <Link
    to={to}
    className={`relative ${mobile ? "block px-4 py-2 text-sky-900" : "hover:text-sky-700"} group px-3 py-1 transition-all`}
  >
    <span className="relative inline-block">
      {text}
      {/* Underline Flip Effect */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
    </span>
  </Link>
);

// Profile Dropdown Item
const ProfileMenuItem = ({ to, text }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sky-900 hover:bg-sky-100"
  >
    {text}
  </Link>
);

export default Navbar;
