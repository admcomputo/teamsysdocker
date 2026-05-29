import { useState } from "react";
import { ProfessionalLinksView } from "../components/ProfessionalLinksView";
import { ProfessionalLinksForm } from "../components/ProfessionalLinksForm";
import type { RedSocialResponseDTO } from "../services/professional-links.dto";

type ViewMode = "list" | "form";

export const ProfessionalLinksPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedLink, setSelectedLink] = useState<RedSocialResponseDTO | null>(null);

  const handleNewLink = () => {
    setSelectedLink(null);
    setViewMode("form");
  };

  const handleEditLink = (link: RedSocialResponseDTO) => {
    setSelectedLink(link);
    setViewMode("form");
  };

  const handleBackToList = () => {
    setSelectedLink(null);
    setViewMode("list");
  };

  return (
    <section
      className="bg-card-bg/60 backdrop-blur-md border border-card-border
      rounded-2xl md:rounded-3xl
      p-5 sm:p-6 md:p-8
      shadow-xl"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
        <div className="w-full">
          {viewMode === "list" ? (
            <ProfessionalLinksView
              onNewLink={handleNewLink}
              onEditLink={handleEditLink}
            />
          ) : (
            <ProfessionalLinksForm
              selectedLink={selectedLink}
              onCancel={handleBackToList}
              onSuccess={handleBackToList}
            />
          )}
        </div>
      </div>
    </section>
  );
};