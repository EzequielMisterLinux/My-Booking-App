import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { createAccommodation, updateAccommodation } from '../api/ApiAccommodations';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '24px',
    borderRadius: '8px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

Modal.setAppElement('#root');

export const AccommodationModal = ({ isOpen, onClose, onSubmit = () => {}, accommodation }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      address: '',
      description: ''
    }
  });

  useEffect(() => {
    if (accommodation) {
      reset({
        name: accommodation.name,
        address: accommodation.address,
        description: accommodation.description
      });
    } else {
      reset({
        name: '',
        address: '',
        description: ''
      });
    }
  }, [accommodation, reset]);

  const onFormSubmit = async (data) => {
    try {
      if (accommodation) {
        await updateAccommodation(accommodation.id, data);
        Swal.fire('¡Actualizado!', 'El alojamiento ha sido actualizado exitosamente.', 'success');
      } else {
        await createAccommodation(data);
        Swal.fire('¡Guardado!', 'El alojamiento ha sido creado exitosamente.', 'success');
      }
      onSubmit();
      onClose();
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar el alojamiento.', 'error');
      console.error('Error saving accommodation:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Accommodation Modal"
    >
      <h2 className="text-xl font-bold mb-4">
        {accommodation ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}
      </h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            {...register('name', { required: 'Este campo es obligatorio' })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            {...register('address', { required: 'Este campo es obligatorio' })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            {...register('description', { required: 'Este campo es obligatorio' })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {accommodation ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
