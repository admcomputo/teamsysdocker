import { AppRouter } from './core/router/AppRouter';
import { ToastProvider } from '@shared/context/ToastProvider';
import { AuthProvider } from './core/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
