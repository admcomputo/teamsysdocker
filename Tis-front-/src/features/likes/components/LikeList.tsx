import type { UsuarioLikeDTO } from '../services/likes.dto';
import { LikeCard } from './LikeCard';

interface Props {
  likes: UsuarioLikeDTO[];
}

export function LikesList({ likes }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {likes.map((like, index) => (
        <LikeCard
          key={`${like.nombre}-${index}`}
          like={like}
        />
      ))}
    </div>
  );
}