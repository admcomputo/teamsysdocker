import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/core/context/AuthContext';
import { CVManagementPage } from '@/features/CVManagement';

export const DashMyPerfilPage = () => {
    const { user } = useAuth();
    const [showCVManagement, setShowCVManagement] = useState(false);

    const [copied, setCopied] = useState(false);
    const [publicUrl, setPublicUrl] = useState<string>('');
    const [loadingUrl, setLoadingUrl] = useState(true);

    useEffect(() => {
        const fetchPublicUrl = async () => {
            try {
                const token =
                    sessionStorage.getItem("jwt") ||
                    sessionStorage.getItem("token") ||
                    localStorage.getItem("jwt") ||
                    localStorage.getItem("token");

                const response = await fetch("https://teamsysback.apps.cs.umss.edu.bo/api/enlace/mi-enlace-publico", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPublicUrl(data.urlCompleta);
                } else {
                    // Si el backend falla por alguna razón, usamos una de respaldo basada en el id
                    setPublicUrl(`${window.location.origin}/portafolio/${user?.id}`);
                }
            } catch (err) {
                console.error("Error fetching public url:", err);
                setPublicUrl(`${window.location.origin}/portafolio/${user?.id}`);
            } finally {
                setLoadingUrl(false);
            }
        };

        fetchPublicUrl();
    }, [user?.id]);

    const copyToClipboard = () => {
        if (!publicUrl) return;
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    if (showCVManagement) {
        return <CVManagementPage onBack={() => setShowCVManagement(false)} />;
    }
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                        ¡Hola, {user?.fullName?.split(' ')[0] || 'Usuario'}! 👋
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Bienvenido a tu panel de control de Portafolios TIS.
                    </p>
                </div>
            </div>

            {/* Banner de Enlace Único Compartible */}
            <div className="relative overflow-hidden rounded-3xl border border-brand-azul-brillante/30 bg-gradient-to-r from-brand-azul-profundo/80 to-brand-azul-medio/40 p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Luces decorativas */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-azul-brillante/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-accent-neon/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-2 flex-1 text-center md:text-left z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-azul-brillante/10 border border-brand-azul-brillante/30 px-3 py-1 text-xs font-semibold text-brand-azul-neon">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-neon animate-pulse" />
                        Tu enlace profesional único
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-text-high-fidelity tracking-tight">
                        Comparte tu portafolio de manera pública
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base max-w-xl">
                        Copia tu enlace único y compártelo. Cualquier persona, incluso sin iniciar sesión, podrá ver tu portafolio profesional completo y trayectoria.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto z-10">
                    <div className="bg-brand-azul-oscuro/80 border border-card-border rounded-xl px-4 py-3 text-xs sm:text-sm font-medium font-mono text-brand-celeste-suave flex items-center gap-2 select-all overflow-x-auto max-w-[280px] sm:max-w-md md:max-w-xs lg:max-w-md shadow-inner shrink-0">
                        <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="truncate">
                            {loadingUrl ? "Generando enlace..." : publicUrl}
                        </span>
                    </div>

                    <button
                        onClick={copyToClipboard}
                        disabled={loadingUrl || !publicUrl}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${copied
                                ? 'bg-[#0f342b] text-[#34d399] border border-[#25c48c]/30 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                                : 'bg-brand-azul-brillante hover:bg-brand-azul-neon text-white hover:shadow-[0_0_15px_rgba(47,128,237,0.4)]'
                            }`}
                    >
                        {copied ? (
                            <>
                                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>¡Copiado!</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2h2a2 2 0 002-2M8 5a2 2 0 00-2 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                <span>Copiar Enlace</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-azul-brillante/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Tu Perfil</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Mantén tu información personal y de contacto actualizada.
                    </p>
                    <Link to="/profile" className="text-brand-azul-brillante font-medium text-sm hover:underline">
                        Revisar perfil →
                    </Link>
                </div>

                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-morado/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Habilidades tecnicas</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Añade y organiza tus habilidades técnicas .
                    </p>
                    <Link to="/habilidades-tecnicas" className="text-brand-morado font-medium text-sm hover:underline">
                        Gestionar habilidades →
                    </Link>
                </div>

                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-violet-500/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Experiencia</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Registra y organiza tu experiencia laboral.
                    </p>
                    <Link to="/experience" className="text-violet-400 font-medium text-sm hover:underline">
                        Ir a experiencia →
                    </Link>
                </div>

                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-[#10B981]/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Proyectos</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Muestra tus mejores trabajos y casos de éxito.
                    </p>
                    <Link to="/projects" className="text-[#10B981] font-medium text-sm hover:underline">
                        Ir a proyectos →
                    </Link>
                </div>
                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-[#10B981]/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Formacion Academica</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Muestra tu formacion academica.
                    </p>
                    <Link to="/academic-training" className="text-[#10B981] font-medium text-sm hover:underline">
                        Ir a formacion academica →
                    </Link>
                </div>

                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-[#10B981]/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Habilidades Blandas</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Añade y organiza tus habilidades blandas.
                    </p>
                    <Link to="/habilidades-blandas" className="text-[#10B981] font-medium text-sm hover:underline">
                        Gestionar habilidades →
                    </Link>
                </div>

                <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-azul-brillante/50 transition-colors group">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Gestión de CV</h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Genera, sube y administra tu CV oficial desde aquí.
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowCVManagement(true)}
                        className="text-brand-azul-brillante font-medium text-sm hover:underline"
                    >
                        Ir a Gestión de CV →
                    </button>
                </div>
            </div>
        </div>

    );
};