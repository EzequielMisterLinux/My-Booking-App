import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { X, Home, Calendar, LogOut, User,  } from 'lucide-react';

export const Sidebar = ({ onToggle, isOpen, isDesktop }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Alojamientos',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />
    },
    {
      title: 'Reservaciones',
      path: '/reservations',
      icon: <Calendar className="h-5 w-5" />
    },
    {
        title: 'Usuarios',
        path: '/users',
        icon: <User className="h-5 w-5" />
      }
  ];

  return (
    <>
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          w-[280px] sm:w-[320px] md:w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDesktop ? 'md:translate-x-0' : ''}
        `}
      >
        <div className="h-full flex flex-col">

          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Panel de Control</h2>
              {!isDesktop && (
                <button
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>


          <nav className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => !isDesktop && onToggle()}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          </nav>


          <div className="p-4 md:p-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full
                text-gray-700 hover:bg-gray-50 rounded-lg
                transition-all duration-200 group"
            >
              <LogOut className="h-5 w-5 group-hover:text-red-500" />
              <span className="font-medium group-hover:text-red-500">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};