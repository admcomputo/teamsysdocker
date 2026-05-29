import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@shared/components/ui/Button';
import { Logo } from '@shared/components/ui/Logo';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-bg-dark/80 backdrop-blur-md border-b border-card-border px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95 shrink-0">
          <Logo size={36} />
          <span className="text-lg md:text-xl font-bold tracking-tight text-[#E2F0FF] truncate">
            Sistema <span className="hidden sm:inline">Generador</span> de Portafolios
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-4">
          <Link to="/register">
            <Button size="md" className="font-semibold px-8">
              Registrarse
            </Button>
          </Link>
          <Link to="/login">
            <Button size="md" variant="ghost" className="border border-card-border font-medium text-text-secondary hover:text-text-primary px-8">
              Iniciar Sesión
            </Button>
          </Link>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 text-text-secondary hover:text-text-primary transition-colors active:scale-90"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={`
        sm:hidden absolute top-full left-0 w-full bg-bg-dark/95 backdrop-blur-xl border-b border-card-border transition-all duration-300 ease-in-out overflow-hidden
        ${isMenuOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
      `}>
        <div className="flex flex-col items-center gap-4 px-4">
          <Link to="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
            <Button size="md" className="w-full font-semibold">
              Registrarse
            </Button>
          </Link>
          <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
            <Button size="md" variant="ghost" className="w-full border border-card-border font-medium text-text-secondary">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
