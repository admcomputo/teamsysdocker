import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
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
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-md">
          <FaLinkedin size={24} />
        </div>
      );

    case "github":
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#171515] text-white shadow-md">
          <FaGithub size={24} />
        </div>
      );

    default:
      return (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#334155] text-white shadow-md">
          <FaGlobe size={22} />
        </div>
      );
  }
};

export const ProfessionalLinksView = ({ onNewLink, onEditLink }: Props) => {
const [links, setLinks] = useState<RedSocialResponseDTO[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const loadLinks = async () => {
    try {
      setIsLoading(true);
      const response = await professionalLinksService.getProfessionalLinks();
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
    <div className="w-full max-w-6xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold">Redes profesionales</h1>
          <p className="mt-2 text-lg text-[#9CA3AF]">
            Gestiona todos tus enlaces profesionales
          </p>
        </div>

        <button
          type="button"
          onClick={onNewLink}
          className="flex items-center gap-2 rounded-xl bg-[#43C77A] px-5 py-3 font-semibold hover:bg-[#38b56b]"
        >
          <Plus size={18} />
          Nuevo enlace
        </button>
      </div>

      <div className="grid gap-5">
        {isLoading && <p>Cargando enlaces...</p>}

        {!isLoading && links.length === 0 && (
          <p className="text-[#9CA3AF]">No tienes enlaces registrados.</p>
        )}

        {links.map((link) => (
          <div
            key={link.idRed}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-[#1E3558] bg-[#0B1F3A] p-6"
          >
            <div className="flex items-center gap-4">
              {getNetworkIcon(link.nombreRed)}

              <div>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-semibold">{link.nombreRed}</p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      link.esPublico
                        ? "bg-green-500/20 text-green-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {link.esPublico ? "Público" : "Privado"}
                  </span>
                </div>

                <a
                  href={link.urlPerfil}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#38BDF8] hover:underline break-all"
                >
                  {link.urlPerfil}
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={link.urlPerfil}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2C4265] bg-[#11213A] text-[#93C5FD] hover:bg-[#163156]"
              >
                <Eye size={18} />
              </a>

              <button
                type="button"
                onClick={() => onEditLink(link)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2C4265] bg-[#11213A] text-[#FACC15] hover:bg-[#3A2E0B]"
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(link.idRed)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2C4265] bg-[#11213A] text-red-400 hover:bg-[#3A1616]"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};