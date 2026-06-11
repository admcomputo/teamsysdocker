import { useState } from "react";
import { ProfessionalLinksView } from "../components/ProfessionalLinksView";
import { ProfessionalLinksForm } from "../components/ProfessionalLinksForm";
import type { RedSocialResponseDTO } from "../services/professional-links.dto";

type ViewMode = "list" | "form";

export const ProfessionalLinksPage = () => {
  const [viewMode, setViewMode] =
    useState<ViewMode>("list");

  const [selectedLink, setSelectedLink] =
    useState<RedSocialResponseDTO | null>(null);

  const handleNewLink = () => {
    setSelectedLink(null);
    setViewMode("form");
  };

  const handleEditLink = (
    link: RedSocialResponseDTO
  ) => {
    setSelectedLink(link);
    setViewMode("form");
  };

  const handleBackToList = () => {
    setSelectedLink(null);
    setViewMode("list");
  };

  return (
    <section
      className="
        w-full
        max-w-7xl
        mx-auto

        bg-card-bg/60
        backdrop-blur-md
        border
        border-card-border

        rounded-xl
        sm:rounded-2xl
        md:rounded-3xl

        p-3
        sm:p-5
        md:p-6
        lg:p-8

        shadow-xl

        overflow-hidden
      "
    >
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
    </section>
  );
};