import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function AdminLayout() {
  const { authenticated, checking, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!checking && !authenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [checking, authenticated, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-cream flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-sand px-6 py-4 flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-sand/50 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <h1 className="font-display text-lg font-bold text-earth">Holistic Admin</h1>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
