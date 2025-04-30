import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Train size={28} className="text-orange-400" />
            <div>
              <h1 className="text-xl font-bold">Transit Health</h1>
              <p className="text-xs text-gray-300">National Dashboard</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLinks />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-3">
            <NavLinks onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/map", label: "Transit Map" },
    { to: "/agencies", label: "Agencies" },
    { to: "/analytics", label: "Analytics" },
    { to: "/about", label: "About" }
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-white hover:text-orange-300 transition-colors font-medium"
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Header;