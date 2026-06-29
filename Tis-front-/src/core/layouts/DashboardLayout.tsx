import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '@shared/components/ui/Logo';
import { ShareModal } from '@shared/components/ui/ShareModal';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  const esAdministrador = user?.roles?.includes('ROLE_ADMIN');

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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/perfil`, {
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


  useEffect(() => {
    const fetchShareUrl = async () => {
      try {
        const token =
          sessionStorage.getItem('jwt') ||
          sessionStorage.getItem('token') ||
          localStorage.getItem('jwt') ||
          localStorage.getItem('token');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/enlace/mi-enlace-publico`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setShareUrl(data.urlCompleta || '');
        } else {
          setShareUrl(`${window.location.origin}/portafolio/${user?.id}`);
        }
      } catch {
        setShareUrl(`${window.location.origin}/portafolio/${user?.id}`);
      }
    };

    fetchShareUrl();
  }, [user?.id]);

  const navLinks: { name: string; path: string | null; icon: string }[] = [
    {
      name: 'Informacion Basica',
      path: '/profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      name: 'Likes recibidos',
      path: '/my-profile/visits',
icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',    },
    {
      name: 'Cambiar Contraseña',
      path: '/change-password',
icon: 'M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z'    },
    {
      name: 'Buscar Portafolios',
      path: '/buscar-portafolios',
      icon: 'M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z',
    },
    {
      name: 'Comparte Portafolio',
      path: null,
      icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    },

    ...(esAdministrador
      ? [
        {
          name: 'Reportes de Usuarios',
          path: '/admin/reportes/usuarios',
          icon: 'M3 3v18h18M7 16V9m5 7V5m5 11v-6',
        },
      ]
      : []),
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
          <div className="flex items-center gap-2 sm:gap-6">
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
                Gestión de Perfil
              </Link>
            </nav>

            {/* User Profile / Menu Toggle */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 sm:gap-4 focus:outline-none transition-opacity hover:opacity-80 p-1 rounded-lg"
              >
                <div className="text-sm text-right hidden sm:block">
                  <p className="font-semibold text-text-primary truncate max-w-[150px]">{user?.fullName || 'Usuario'}</p>
                  <p className="text-text-secondary text-xs truncate max-w-[150px]">{user?.email}</p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-brand-azul-brillante/30 bg-brand-azul-brillante/20 shrink-0">
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
                <div className="md:hidden p-2 border-b border-card-border/50 space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${location.pathname === '/dashboard' ? 'bg-brand-azul-brillante/10 text-brand-azul-brillante' : 'text-text-secondary hover:text-text-primary hover:bg-card-border/30'}`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Inicio
                  </Link>
                  <Link
                    to="/DashMyPerfil"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${location.pathname === '/DashMyPerfil' ? 'bg-brand-azul-brillante/10 text-brand-azul-brillante' : 'text-text-secondary hover:text-text-primary hover:bg-card-border/30'}`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2h-3V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v6m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" /></svg>
                    Gestión de Perfil
                  </Link>
                </div>
                <nav className="p-2 space-y-1 max-h-[60vh] overflow-y-auto">
                  {navLinks.map((link) => {
                    const isActive = link.path ? location.pathname === link.path : false;
                    const isShare = link.name === 'Comparte Portafolio';
                    const iconEl = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                      </svg>
                    );
                    if (isShare) {
                      return (
                        <button
                          key="share"
                          onClick={() => { setIsMenuOpen(false); setShareModalOpen(true); }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium w-full text-left text-text-secondary hover:text-brand-azul-brillante hover:bg-brand-azul-brillante/10"
                        >
                          {iconEl}
                          {link.name}
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={link.path}
                        to={link.path!}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium
                        ${isActive
                            ? 'bg-brand-azul-brillante/10 text-brand-azul-brillante'
                            : 'text-text-secondary hover:text-text-primary hover:bg-card-border/30'
                          }`}
                      >
                        {iconEl}
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

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={shareUrl}
      />
    </div>
  );
};
