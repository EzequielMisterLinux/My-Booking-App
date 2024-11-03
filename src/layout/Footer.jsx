import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-lg font-bold">Alacrysoft Systems</h1>
            <p className="text-sm">Conectando tecnología y creatividad.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400">Inicio</a>
            <a href="#" className="hover:text-gray-400">Servicios</a>
            <a href="#" className="hover:text-gray-400">Acerca de</a>
            <a href="#" className="hover:text-gray-400">Contacto</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            © 2024 grupo Alacrysoft Kodigo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
