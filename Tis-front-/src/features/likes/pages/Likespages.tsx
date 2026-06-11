import { useLikes } from '../hooks/useLikes';
import { LikesList } from '../components/LikeList';
import { Heart } from "lucide-react";

export function LikesPage() {

  const {
    likes,
    totalLikes,
    loading,
    error,
  } = useLikes();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] px-4">
        <p className="text-center">Cargando likes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">

      {/* Header */}
      <div className="bg-red-500 text-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Título */}
          <div className="flex items-center gap-3">
            <Heart
              size={24}
              className="sm:w-7 sm:h-7"
            />

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Likes recibidos
            </h1>
          </div>

          {/* Contador */}
          <div className="text-center sm:text-right">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {totalLikes}
            </p>

            <p className="opacity-90 text-xs sm:text-sm">
              likes registrados
            </p>
          </div>

        </div>

      </div>

      {/* Contenido */}
      {likes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-6 sm:p-8 md:p-10 text-center">

          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Aún no tienes likes
          </h3>

          <p className="text-sm sm:text-base text-gray-500">
            Cuando otros usuarios den like
            a tu perfil aparecerán aquí.
          </p>

        </div>
      ) : (
        <LikesList likes={likes} />
      )}

    </div>
  );
}