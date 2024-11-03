import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Filter, Plus} from 'lucide-react';

import { es } from 'date-fns/locale';
import { getBookings } from '../api/ApiBookings';
import { BookingDetailsModal } from '../modals/BookingDetailsModal';
import CreateBookingModal  from '../modals/CreateBookingModal'; 


const ReservationPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchGuest, setSearchGuest] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [selectedAccommodation, selectedStatus, searchGuest, bookings]);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    if (selectedAccommodation !== 'all') {
      filtered = filtered.filter(booking => booking.accomodation === selectedAccommodation);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === selectedStatus);
    }

    if (searchGuest.trim()) {
      filtered = filtered.filter(booking => 
        booking.user.toLowerCase().includes(searchGuest.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const getBookingsForDate = (date) => {
    return filteredBookings.filter(booking => {
      const checkIn = new Date(booking.check_in_date);
      const checkOut = new Date(booking.check_out_date);
      return date >= checkIn && date <= checkOut;
    });
  };

  const tileContent = ({ date }) => {
    const dateBookings = getBookingsForDate(date);
    if (dateBookings.length === 0) return null;

    return (
      <div className="text-xs mt-1">
        {dateBookings.map((booking) => (
          <div
            key={booking.id}
            className={`p-1 mb-1 rounded-md cursor-pointer transition-colors ${
              booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
              booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBooking(booking);
              setShowDetailsModal(true);
            }}
          >
            <div className="font-medium">{booking.user}</div>
            <div className="text-xs opacity-75">{booking.accomodation}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Reservaciones</h1>
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button 
            onClick={() => setShowCreateModal(true)} // Abre el modal de creación
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Reservación
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alojamiento</label>
          <select 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedAccommodation}
            onChange={(e) => setSelectedAccommodation(e.target.value)}
          >
            <option value="all">Todos los alojamientos</option>
            <option value="Apartamento Centro">Apartamento Centro</option>
            <option value="Casa de Playa">Casa de Playa</option>
            <option value="Villa Montaña">Villa Montaña</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="PENDING">Pendiente</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buscar huésped</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre del huésped..."
            value={searchGuest}
            onChange={(e) => setSearchGuest(e.target.value)}
          />
        </div>
      </div>

      {/* Calendar */}
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          className="w-full"
          locale={es}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span className="text-sm text-gray-600">Confirmada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 rounded"></div>
          <span className="text-sm text-gray-600">Pendiente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded"></div>
          <span className="text-sm text-gray-600">Cancelada</span>
        </div>
      </div>

      {/* Modals */}
      <BookingDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
        onUpdateStatus={fetchBookings}
      />

      <CreateBookingModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={fetchBookings}
      />
    </div>
  );
};

export default ReservationPage;
