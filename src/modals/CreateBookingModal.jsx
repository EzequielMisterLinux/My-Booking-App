import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { createBooking } from '../api/ApiBookings';
import { useState } from 'react';


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
    borderRadius: '0.5rem',
    maxWidth: '500px',
    width: '90%'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

Modal.setAppElement('#root');


const CreateBookingModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    accommodation: '',
    guest: '',
    startDate: null,
    endDate: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      booking: `BK${Math.floor(Math.random() * 100000)}`,
      check_in_date: format(formData.startDate, 'yyyy-MM-dd'),
      check_out_date: format(formData.endDate, 'yyyy-MM-dd'),
      total_amount: 500,
      accomodation_id: 1,
      user_id: 1
    };

    try {
      await createBooking(bookingData);
      onClose();
      if (onSave) onSave();
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Nueva Reservación</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Alojamiento</label>
            <select 
              className="w-full p-2 border rounded"
              value={formData.accommodation}
              onChange={(e) => setFormData({...formData, accommodation: e.target.value})}
            >
              <option value="">Seleccione un alojamiento</option>
              <option value="Apartamento Centro">Apartamento Centro</option>
              <option value="Casa de Playa">Casa de Playa</option>
              <option value="Villa Montaña">Villa Montaña</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Huésped</label>
            <input 
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Nombre del huésped"
              value={formData.guest}
              onChange={(e) => setFormData({...formData, guest: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Fecha de inicio</label>
              <DatePicker
                selected={formData.startDate}
                onChange={date => setFormData({...formData, startDate: date})}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border rounded"
                locale={es}
                placeholderText="Seleccione fecha"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Fecha de fin</label>
              <DatePicker
                selected={formData.endDate}
                onChange={date => setFormData({...formData, endDate: date})}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border rounded"
                locale={es}
                placeholderText="Seleccione fecha"
                minDate={formData.startDate}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBookingModal;
