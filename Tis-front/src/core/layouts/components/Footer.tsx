export const Footer = () => {
  return (
    <footer className="w-full px-8 py-10 border-t border-card-border/30 bg-bg-dark/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-xs font-light text-text-muted text-center md:text-left">
          <div className="flex gap-4">
            <a href="#" className="hover:text-text-primary transition-colors">Privacidad</a>
            <span className="text-card-border">|</span>
            <a href="#" className="hover:text-text-primary transition-colors">Condiciones</a>
          </div>
          <span className="hidden md:inline text-card-border">|</span>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <span>Desarrollado por: <span className="text-brand-azul-electrico font-medium">TEAMSYS S.R.L.</span></span>
            <span className="hidden sm:inline text-card-border">|</span>
            <a href="mailto:TEAMSYS2020@GMAIL.COM" className="hover:text-text-primary transition-colors">TEAMSYS2020@GMAIL.COM</a>
          </div>
        </div>
        <p className="text-[10px] text-text-muted/60 tracking-wider">
          &copy; {new Date().getFullYear()} TEAMSYS S.R.L. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
