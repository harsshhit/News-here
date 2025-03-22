import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const handleNavToggle = () => setIsNavOpen(!isNavOpen);
  const handleNavLinkClick = () => setIsNavOpen(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 shadow-lg fixed w-full top-0 z-50 backdrop-blur-sm bg-opacity-90" role="navigation">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-105">
            News Site
          </Link>
          <button
            className="text-white lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            onClick={handleNavToggle}
            aria-label="Toggle navigation menu"
          >
            {isNavOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <div
            className={`lg:flex lg:items-center w-full lg:w-auto transition-all duration-300 ease-in-out transform ${
              isNavOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"
            } fixed lg:relative top-[64px] lg:top-0 left-0 bg-gray-900 lg:bg-transparent h-screen lg:h-auto`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-4 mt-4 lg:mt-0">
              <li>
                <Link
                  to="/"
                  onClick={handleNavLinkClick}
                  className={`block px-4 py-2 hover:bg-gray-700 rounded-md ${
                    location.pathname === "/" ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  onClick={handleNavLinkClick}
                  className={`block px-4 py-2 hover:bg-gray-700 rounded-md ${
                    location.pathname === "/admin"
                      ? "bg-gray-700 text-white"
                      : ""
                  }`}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;


