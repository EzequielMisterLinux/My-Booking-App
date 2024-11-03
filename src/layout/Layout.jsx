import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Menu } from 'lucide-react';

import Footer from './Footer';
import Header from './Header';

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);
      setIsSidebarOpen(width >= 768);
    };


    handleResize();


    window.addEventListener('resize', handleResize);
    

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (!isDesktop) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktop]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 relative flex">

      <button
        onClick={toggleSidebar}
        className={`
          fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg
          hover:bg-gray-100 transition-colors duration-200
          md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isSidebarOpen ? 'invisible' : 'visible'}
        `}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>


      <div ref={sidebarRef}>
        <Sidebar 
          onToggle={toggleSidebar} 
          isOpen={isSidebarOpen}
          isDesktop={isDesktop} 
        />
      </div>

      

      <main
      
        className={`
          flex-1 transition-all duration-300 ease-in-out
          pt-16 md:pt-6 px-4 sm:px-6 lg:px-8
          ${isDesktop ? 'md:ml-64' : isSidebarOpen ? 'ml-0' : 'ml-0'}
          relative
        `}
      >
        <Header/>
        
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
        <Footer/>
      </main>
      
    </div>
    
    </>
  );
};
