import { useState } from 'react';
import { CVManagementMenu } from '../components/CVManagementMenu';
import { GenerateCVSection } from '../components/GenerateCVSection';
import { UploadCVSection } from '../components/UploadCVSection';
import { ViewCVSection } from '../components/ViewCVSection';
import { ManageCVsSection } from '../components/ManageCVsSection';

export type CVManagementView = 'menu' | 'generate' | 'upload' | 'view' | 'manage';

interface CVManagementPageProps {
  onBack?: () => void;
}

export const CVManagementPage = ({}: CVManagementPageProps) => {
  const [currentView, setCurrentView] = useState<CVManagementView>('menu');

  const handleSelectOption = (option: string) => {
    if (option === 'generate') {
      setCurrentView('generate');
    } else if (option === 'upload') {
      setCurrentView('upload');
    } else if (option === 'view') {
      setCurrentView('view');
    } else if (option === 'manage') {
      setCurrentView('manage');
    }
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleManageFromViewCV = () => {
    setCurrentView('manage');
  };

  const handleViewOfficialCVFromManage = () => {
    console.log('🔄 Cambiando a vista VIEW desde MANAGE');
    setCurrentView('view');
  };

  const handleSuccess = () => {
    // Volver al menú después de éxito
    setCurrentView('menu');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {currentView === 'menu' && (
        <CVManagementMenu onSelectOption={handleSelectOption} />
      )}

      {currentView === 'generate' && (
        <GenerateCVSection onBack={handleBackToMenu} onSuccess={handleSuccess} />
      )}

      {currentView === 'upload' && (
        <UploadCVSection onBack={handleBackToMenu} onSuccess={handleSuccess} />
      )}

      {currentView === 'view' && (
        <ViewCVSection onBack={handleBackToMenu} onSelectAnotherCV={handleManageFromViewCV} />
      )}

      {currentView === 'manage' && (
        <ManageCVsSection 
          onBack={handleBackToMenu}
          onViewOfficialCV={handleViewOfficialCVFromManage}  // ✅ AGREGAR esta prop
        />
      )}
    </div>
  );
};
