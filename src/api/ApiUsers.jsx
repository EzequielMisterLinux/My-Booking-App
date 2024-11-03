import api from "./InterceptorApi";

export const login = async (email, password) => {
  const response = await api.post('/api/V1/login', { email, password });
  return response.data;
};


export const getAllUsers = async () => {
    const response = await api.get('/api/V1/users');
    return response.data
}