import { NavLink } from "react-router-dom"
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-3">
            <img src="DoctorLogo.jpeg" alt="Logo" className="w-12 h-12 rounded-full" />
            <p className="text-2xl font-bold text-indigo-600">Health Analyzer</p>
          </div>

        {/* Desktop Menu */}
          <nav className="hidden md:flex gap-9 items-center text-gray-700 font-bold">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "hover:text-indigo-600"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/symptom-analyzer"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "hover:text-indigo-600"
              }
            >
              Symptom Analyzer
            </NavLink>

            <NavLink
              to="/report-analyzer"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "hover:text-indigo-600"
              }
            >
              Report Analyzer
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <NavLink
            to="/"
            end
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block py-2 ${
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/symptom-analyzer"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block py-2 ${
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
          >
            Symptom Analyzer
          </NavLink>
          <NavLink
            to="/report-analyzer"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block py-2 ${
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
          >
            Report Analyzer
          </NavLink>
          
        </div>
      )}
    </header>
  )
}

export default Header