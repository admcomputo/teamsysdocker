import type { UsuarioLikeDTO } from '../services/likes.dto';

interface Props {
  like: UsuarioLikeDTO;
}

const DEFAULT_AVATAR =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';

export function LikeCard({ like }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={like.foto || DEFAULT_AVATAR}
          alt={like.nombre}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            {like.nombre}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {like.profesion || 'Profesión no especificada'}
          </p>

          <p className="text-[11px] sm:text-xs text-gray-400 mt-1 break-words">
            {new Date(like.fechaLike).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}