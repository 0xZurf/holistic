const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Public
export const getServices = () => request('/services');
export const getService = (slug) => request(`/services/${slug}`);
export const getRetreats = () => request('/retreats');
export const getRetreat = (slug) => request(`/retreats/${slug}`);
export const getProducts = (category) => request(`/products${category ? `?category=${category}` : ''}`);
export const getProduct = (slug) => request(`/products/${slug}`);
export const getTestimonials = (featured) => request(`/testimonials${featured ? '?featured=1' : ''}`);
export const getSettings = () => request('/settings');
export const submitContact = (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) });
export const createCheckoutSession = (items) => request('/checkout', { method: 'POST', body: JSON.stringify({ items }) });

// Admin
export const adminLogin = (email, password) => request('/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const adminLogout = () => request('/admin/logout', { method: 'POST' });
export const getDashboard = () => request('/admin/dashboard');

export const adminGetServices = () => request('/admin/services');
export const adminCreateService = (data) => request('/admin/services', { method: 'POST', body: JSON.stringify(data) });
export const adminUpdateService = (id, data) => request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const adminDeleteService = (id) => request(`/admin/services/${id}`, { method: 'DELETE' });

export const adminGetRetreats = () => request('/admin/retreats');
export const adminCreateRetreat = (data) => request('/admin/retreats', { method: 'POST', body: JSON.stringify(data) });
export const adminUpdateRetreat = (id, data) => request(`/admin/retreats/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const adminDeleteRetreat = (id) => request(`/admin/retreats/${id}`, { method: 'DELETE' });

export const adminGetProducts = () => request('/admin/products');
export const adminCreateProduct = (data) => request('/admin/products', { method: 'POST', body: JSON.stringify(data) });
export const adminUpdateProduct = (id, data) => request(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const adminDeleteProduct = (id) => request(`/admin/products/${id}`, { method: 'DELETE' });

export const adminGetOrders = (status) => request(`/admin/orders${status ? `?status=${status}` : ''}`);
export const adminGetOrder = (id) => request(`/admin/orders/${id}`);
export const adminUpdateOrder = (id, data) => request(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const adminGetTestimonials = () => request('/admin/testimonials');
export const adminCreateTestimonial = (data) => request('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) });
export const adminUpdateTestimonial = (id, data) => request(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const adminDeleteTestimonial = (id) => request(`/admin/testimonials/${id}`, { method: 'DELETE' });

export const adminUpdateSettings = (data) => request('/admin/settings', { method: 'PUT', body: JSON.stringify(data) });

export async function adminUploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${BASE}/admin/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
