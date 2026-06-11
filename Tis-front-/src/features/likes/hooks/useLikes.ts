import { useEffect, useState } from 'react';

import { likesService } from '../services/like.service';
import type { ProfileLike } from '../models/like.model';

export const useLikes = () => {
  const [loading, setLoading] =
    useState(true);

  const [totalLikes, setTotalLikes] =
    useState(0);

  const [likes, setLikes] =
    useState<ProfileLike[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  const loadLikes = async () => {
    try {
      setLoading(true);

      const [total, history] =
        await Promise.all([
          likesService.getTotalLikes(),
          likesService.getLikesHistory(),
        ]);

      setTotalLikes(total);
      setLikes(history);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error desconocido'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLikes();
  }, []);

  return {
    loading,
    error,
    totalLikes,
    likes,
    reload: loadLikes,
  };
};