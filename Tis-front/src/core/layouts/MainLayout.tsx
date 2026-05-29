import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary flex flex-col selection:bg-button-primary/30">
      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
