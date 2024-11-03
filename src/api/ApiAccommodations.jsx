import api from "./InterceptorApi";

export const login = async (email, password) => {
  const response = await api.post('/api/V1/login', { email, password });
  return response.data;
};

export const getAccommodations = async () => {
  const response = await api.get('/api/V1/accomodations');
  return response.data;
};

export const getAccommodation = async (id) => {
  const response = await api.get(`/api/V1/accomodation/${id}`);
  return response.data;
};

export const createAccommodation = async (data) => {
  const response = await api.post('/api/V1/accomodation', data);
  return response.data;
};

export const updateAccommodation = async (id, data) => {
  const response = await api.put(`/api/V1/accomodation/${id}`, data);
  return response.data;
};


export const deleteAccommodation = async (id) => {
    const response = await api.delete(`/api/V1/accomodation/${id}`);
    return response.data;
};