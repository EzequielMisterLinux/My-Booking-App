import api from "./InterceptorApi";

export const login = async (email, password) => {
  const response = await api.post('/api/V1/login', { email, password });
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get('/api/V1/bookings');
  return response.data;
};

export const getBookingCalendar = async (id_accomodation) => {
  const response = await api.get(`/api/V1/bookings/calendar/${id_accomodation}`);
  return response.data;
};

export const createBooking = async (data) => {
  const response = await api.post('/api/V1/booking', data);
  return response.data;
};

export const updateBooking = async (id, data) => {
  const response = await api.patch(`/api/V1/status_booking/${id}`, data);
  return response.data;
};


