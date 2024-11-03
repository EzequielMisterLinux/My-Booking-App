import React, { useEffect, useState } from 'react';
import { getAccommodations, deleteAccommodation, getAccommodation } from '../api/ApiAccommodations';
import { AccommodationModal } from '../modals/AccommodationModal';
import { ViewAccommodationModal } from '../modals/ViewAccommodationModal';
import { Pencil, Trash2, Eye } from 'lucide-react';

export const Dashboard = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAccommodations();
      setAccommodations(data);
    } catch (error) {
      setError('Error al cargar los alojamientos. Por favor, intente nuevamente.');
      console.error('Error fetching accommodations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este alojamiento?')) {
      try {
        setIsLoading(true);
        await deleteAccommodation(id);
        await fetchAccommodations();
      } catch (error) {
        setError('Error al eliminar el alojamiento. Por favor, intente nuevamente.');
        console.error('Error deleting accommodation:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleView = async (id) => {
    try {
      setIsLoading(true);
      const accommodation = await getAccommodation(id);
      setSelectedAccommodation(accommodation);
      setIsViewModalOpen(true);
    } catch (error) {
      setError('Error al cargar los detalles del alojamiento. Por favor, intente nuevamente.');
      console.error('Error fetching accommodation details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAccommodation(null);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedAccommodation(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accommodations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(accommodations.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Alojamientos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Nuevo Alojamiento
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>

                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dirección
                      </th>
                      <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imagen
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                          No hay alojamientos disponibles
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((accommodation) => (
                        <tr key={accommodation.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 max-w-[150px] truncate">
                              {accommodation.name}
                            </div>
                          </td>
                          <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 max-w-[150px] truncate">
                              {accommodation.address}
                            </div>
                          </td>
                          <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 max-w-[150px] truncate">
                              {accommodation.description}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="h-12 w-16 md:h-16 md:w-24 relative">
                              <img
                                src={accommodation.image}
                                alt={accommodation.name}
                                className="h-full w-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = '/placeholder-image.jpg';
                                  e.target.onerror = null;
                                }}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            <div className="flex justify-end space-x-2 md:space-x-3">
                              <button
                                onClick={() => handleView(accommodation.id)}
                                className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                title="Ver detalles"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleEdit(accommodation)}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                title="Editar"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(accommodation.id)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                title="Eliminar"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 md:px-4 py-2 rounded-lg transition-colors duration-200 ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        <AccommodationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          accommodation={selectedAccommodation}
          refreshData={fetchAccommodations}
        />

        <ViewAccommodationModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          accommodation={selectedAccommodation}
        />
      </div>
    </div>
  );
};