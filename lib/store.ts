"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CategoryId } from "@/lib/types";

export type VibeScores = Record<CategoryId, number>;

const ZERO_SCORES: VibeScores = {
  saas: 0,
  creative: 0,
  utility: 0,
  social: 0,
  deeptech: 0,
};

interface VibeState {
  scores: VibeScores;
  liked: Record<string, boolean>;
  totalSurprises: number;
  totalLikes: number;
  hydrated: boolean;
  toggleLike: (projectId: string, category: CategoryId) => void;
  isLiked: (projectId: string) => boolean;
  recordSurprise: () => void;
  resetVibes: () => void;
  _setHydrated: (v: boolean) => void;
}

export const useVibeStore = create<VibeState>()(
  persist(
    (set, get) => ({
      scores: { ...ZERO_SCORES },
      liked: {},
      totalSurprises: 0,
      totalLikes: 0,
      hydrated: false,
      toggleLike: (projectId, category) => {
        const wasLiked = !!get().liked[projectId];
        set((s) => {
          const liked = { ...s.liked };
          const scores = { ...s.scores };
          let totalLikes = s.totalLikes;
          if (wasLiked) {
            delete liked[projectId];
            scores[category] = Math.max(0, scores[category] - 1);
            totalLikes = Math.max(0, totalLikes - 1);
          } else {
            liked[projectId] = true;
            scores[category] = scores[category] + 1;
            totalLikes = totalLikes + 1;
          }
          return { liked, scores, totalLikes };
        });
      },
      isLiked: (projectId) => !!get().liked[projectId],
      recordSurprise: () => set((s) => ({ totalSurprises: s.totalSurprises + 1 })),
      resetVibes: () =>
        set({
          scores: { ...ZERO_SCORES },
          liked: {},
          totalLikes: 0,
        }),
      _setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "vibevault-260-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        scores: s.scores,
        liked: s.liked,
        totalSurprises: s.totalSurprises,
        totalLikes: s.totalLikes,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated(true);
      },
    },
  ),
);
