import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Retreats from './pages/Retreats';
import RetreatPage from './pages/RetreatPage';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ServicesList from './pages/admin/ServicesList';
import ServiceForm from './pages/admin/ServiceForm';
import RetreatsList from './pages/admin/RetreatsList';
import RetreatForm from './pages/admin/RetreatForm';
import ProductsList from './pages/admin/ProductsList';
import ProductForm from './pages/admin/ProductForm';
import OrdersList from './pages/admin/OrdersList';
import OrderPage from './pages/admin/OrderPage';
import TestimonialsList from './pages/admin/TestimonialsList';
import TestimonialForm from './pages/admin/TestimonialForm';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="retreats" element={<Retreats />} />
        <Route path="retreats/:slug" element={<RetreatPage />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout/success" element={<CheckoutSuccess />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="admin/login" element={<Login />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="services/new" element={<ServiceForm />} />
        <Route path="services/:id" element={<ServiceForm />} />
        <Route path="retreats" element={<RetreatsList />} />
        <Route path="retreats/new" element={<RetreatForm />} />
        <Route path="retreats/:id" element={<RetreatForm />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductForm />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="orders/:id" element={<OrderPage />} />
        <Route path="testimonials" element={<TestimonialsList />} />
        <Route path="testimonials/new" element={<TestimonialForm />} />
        <Route path="testimonials/:id" element={<TestimonialForm />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
