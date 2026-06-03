import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '@shared/components/ui/Logo';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        const token = sessionStorage.getItem('jwt');

        const response = await fetch('https://teamsysback.apps.cs.umss.edu.bo/api/usuarios/perfil', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        setProfilePhoto(data.foto || '');
      } catch (error) {
        console.error('Error al cargar foto en navbar:', error);
      }
    };

    loadProfilePhoto();
  }, [location.pathname]);
  const navLinks = [
    { name: 'Mi Perfil', path: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Habilidades', path: '/hardskills', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Proyectos', path: '/projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Cambiar Contraseña', path: '/change-password', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 1114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    { name: 'Experiencia', path: '/experience', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
    {name: 'Buscar Portafolios',path: '/buscar-portafolios', icon: 'M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z',
},
  ];

  return (
    <div className="flex flex-col bg-bg-dark min-h-screen text-text-primary overflow-hidden">
      {/* Topbar */}
      <header className="bg-bg-dark/80 backdrop-blur-md border-b border-card-border sticky top-0 z-30 shrink-0">
        <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95 shrink-0">
            <Logo size={28} />
            <span className="font-bold tracking-tight text-[#E2F0FF] truncate hidden sm:block">Portafolios TIS</span>
          </Link>

          {/* Navigation & User Profile */}
          <div className="flex items-center gap-6">
            {/* Top Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-brand-azul-brillante' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Inicio
              </Link>
              <Link
                to="/DashMyPerfil"
                className={`text-sm font-medium transition-colors ${location.pathname === '/DashMyPerfil' ? 'text-brand-azul-brillante' : 'text-text-secondary hover:text-text-primary'}`}
              >
                Mi Perfil
              </Link>
            </nav>

            {/* User Profile / Menu Toggle */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-4 focus:outline-none transition-opacity hover:opacity-80 p-1 rounded-lg"
              >
                <div className="text-sm text-right hidden sm:block">
                  <p className="font-semibold text-text-primary">{user?.fullName || 'Usuario'}</p>
                  <p className="text-text-secondary text-xs">{user?.email}</p>
                </div>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-azul-brillante/30 bg-brand-azul-brillante/20 shrink-0">
                  <img
                    src={profilePhoto || user?.foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              <div className={`
              absolute top-full right-0 mt-2 w-64 bg-bg-dark border border-card-border rounded-xl shadow-lg border shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 origin-top-right
              ${isMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
            `}>
                <div className="p-3 border-b border-card-border/50 sm:hidden">
                  <p className="font-semibold text-text-primary truncate">{user?.fullName || 'Usuario'}</p>
                  <p className="text-text-secondary text-xs truncate">{user?.email}</p>
                </div>
                <nav className="p-2 space-y-1">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium
                        ${isActive
                            ? 'bg-brand-azul-brillante/10 text-brand-azul-brillante'
                            : 'text-text-secondary hover:text-text-primary hover:bg-card-border/30'
                          }`}
                      >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                        </svg>
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="p-2 border-t border-card-border/50">
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-text-secondary hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-bg-dark w-full relative">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
