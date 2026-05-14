import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  // Home has its own hero that sits behind the fixed nav. Other pages need spacing.
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg text-cream">
      <Header />
      <main className={`flex-1 ${isHome ? '' : 'pt-[72px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
