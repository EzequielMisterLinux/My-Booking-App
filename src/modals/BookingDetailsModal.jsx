import Modal from 'react-modal';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { updateBooking} from '../api/ApiBookings';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    borderRadius: '0.75rem',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)'
  }
};

Modal.setAppElement('#root');

const StatusBadge = ({ status }) => {
  const statusStyles = {
    CONFIRMED: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    CANCELLED: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${statusStyles[status] || statusStyles.PENDING}`}>
      {status === 'CONFIRMED' ? 'Confirmada' : 
       status === 'CANCELLED' ? 'Cancelada' : 'Pendiente'}
    </span>
  );
};


export const BookingDetailsModal = ({ isOpen, onClose, booking, onUpdateStatus }) => {
  const calculateNights = () => {
    if (!booking?.check_in_date || !booking?.check_out_date) return 0;
    const checkIn = new Date(booking.check_in_date);
    const checkOut = new Date(booking.check_out_date);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateBooking(booking?.id, { status: newStatus });
      onUpdateStatus();
      onClose();
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <StatusBadge status={booking?.status} />
            <span className="ml-2 text-gray-500 text-sm">ID: {booking?.id || 'N/A'}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          {booking?.user || 'Sin nombre'}
        </h2>
        <p className="text-gray-600 mb-6">
          {booking?.accomodation || 'Dirección no disponible'}
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Check-in</label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>
                  {booking?.check_in_date ? 
                    format(new Date(booking.check_in_date), 'PPP', { locale: es }) : 
                    'No disponible'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Check-out</label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>
                  {booking?.check_out_date ? 
                    format(new Date(booking.check_out_date), 'PPP', { locale: es }) : 
                    'No disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-sm font-medium mb-2">Resumen de la Estancia</h3>
          <p className="text-sm">{calculateNights()} noches</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cerrar
          </button>
          <div className="flex gap-2">
            {booking?.status !== 'CANCELLED' && (
              <button
                onClick={() => handleStatusUpdate('CANCELLED')}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancelar reservacion
              </button>
            )}
            {booking?.status !== 'CONFIRMED' && (
              <button
                onClick={() => handleStatusUpdate('CONFIRMED')}
                className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
              >
                Confirmar reservacion
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};