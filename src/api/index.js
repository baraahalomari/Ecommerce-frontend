import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req)=>{
  if (localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post(`/api/auth/login`, formData);
export const signUp = (formData) => API.post(`/api/auth/register`, formData);

export const getProducts = () => API.get(`/api/product`);
export const createProduct = (product) => API.post(`/api/product`, product);
export const deleteProduct = (id,user_id) => API.delete(`/api/product/${id}`,{data:{user_id}});
export const updateProduct = (product) => API.put(`/api/product/${product.id}`, product);
export const addToCart = (product) => API.post(`/api/cart`, product);
export const getItemsCart = (user_id) => API.get(`/api/cart?user_id=${user_id}`);
export const removeItem = (id) => API.delete(`/api/cart/${id}`);
export const getFav = (user_id) => API.get(`/api/fav?user_id=${user_id}`);
export const addToFav = (product) => API.post(`/api/fav`, product);
export const deleteFav = (id) => API.delete(`/api/fav/${id}`);
export const getComments = (product_id) => API.get(`/api/comments?product_id=${product_id}`);
export const createComment = (comment) => API.post(`/api/comments`, comment);
