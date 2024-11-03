import React from 'react';

export const ViewAccommodationModal = ({ isOpen, onClose, accommodation }) => {
  if (!isOpen || !accommodation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Detalles del Alojamiento</h2>
        <div className="mb-4">
          <img src={accommodation.image} alt={accommodation.name} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 className="text-lg font-semibold">{accommodation.name}</h3>
          <p className="text-sm text-gray-500">Dirección: {accommodation.address}</p>
          <p className="text-sm text-gray-500">Descripción: {accommodation.description}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
