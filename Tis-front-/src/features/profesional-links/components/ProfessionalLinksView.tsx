import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { professionalLinksService } from "../services/professional-links.service";
import type { RedSocialResponseDTO } from "../services/professional-links.dto";

type Props = {
  onNewLink: () => void;
  onEditLink: (link: RedSocialResponseDTO) => void;
};

const getNetworkIcon = (nombreRed: string) => {
  const red = nombreRed.trim().toLowerCase();

  switch (red) {
    case "linkedin":
      return (
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-md flex-shrink-0">
          <FaLinkedin size={22} />
        </div>
      );

    case "github":
      return (
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#171515] text-white shadow-md flex-shrink-0">
          <FaGithub size={22} />
        </div>
      );

    default:
      return (
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#334155] text-white shadow-md flex-shrink-0">
          <FaGlobe size={20} />
        </div>
      );
  }
};

export const ProfessionalLinksView = ({
  onNewLink,
  onEditLink,
}: Props) => {
  const [links, setLinks] = useState<RedSocialResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLinks = async () => {
    try {
      setIsLoading(true);

      const response =
        await professionalLinksService.getProfessionalLinks();

      setLinks(response.data ?? []);
    } catch (error) {
      console.error(error);
      setLinks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleDelete = async (idRed: number) => {
    try {
      await professionalLinksService.deleteProfessionalLink(idRed);
      loadLinks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8 md:mb-10">

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Redes profesionales
          </h1>

          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#9CA3AF]">
            Gestiona todos tus enlaces profesionales
          </p>
        </div>

        <button
          type="button"
          onClick={onNewLink}
          className="w-full md:w-auto bg-brand-azul-brillante hover:opacity-90 text-white px-5 sm:px-6 py-3 rounded-xl shadow-lg"
        >
          Nuevo enlace
        </button>

      </div>

      <div className="grid gap-4 sm:gap-5">

        {isLoading && (
          <p className="text-center py-6">
            Cargando enlaces...
          </p>
        )}

        {!isLoading && links.length === 0 && (
          <div className="rounded-2xl border border-[#1E3558] bg-[#0B1F3A] p-6 text-center">
            <p className="text-[#9CA3AF]">
              No tienes enlaces registrados.
            </p>
          </div>
        )}

        {links.map((link) => (
          <div
            key={link.idRed}
            className="rounded-2xl border border-[#1E3558] bg-[#0B1F3A] p-4 sm:p-5 md:p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              {/* Información */}
              <div className="flex items-start gap-4 min-w-0">

                {getNetworkIcon(link.nombreRed)}

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                    <p className="text-lg sm:text-xl font-semibold">
                      {link.nombreRed}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        link.esPublico
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {link.esPublico
                        ? "Público"
                        : "Privado"}
                    </span>

                  </div>

                  <a
                    href={link.urlPerfil}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm sm:text-base text-[#38BDF8] hover:underline break-all"
                  >
                    {link.urlPerfil}
                  </a>

                </div>
              </div>

              {/* Acciones */}
              <div className="flex justify-end lg:justify-start gap-2 sm:gap-3">

                <a
                  href={link.urlPerfil}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2C4265] bg-[#11213A] text-[#93C5FD] hover:bg-[#163156] transition"
                >
                  <Eye size={18} />
                </a>

                <button
                  type="button"
                  onClick={() => onEditLink(link)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2C4265] bg-[#11213A] text-[#FACC15] hover:bg-[#3A2E0B] transition"
                >
                  <Pencil size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(link.idRed)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2C4265] bg-[#11213A] text-red-400 hover:bg-[#3A1616] transition"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};