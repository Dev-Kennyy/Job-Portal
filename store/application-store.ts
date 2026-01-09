import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAppliedJobs } from "@/services/jobs";

interface ApplicationState {
  appliedJobs: Set<string>;
  addAppliedJob: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
  clearAppliedJobs: () => void;
  loadAppliedJobs: () => Promise<void>;
}

type PersistedState = {
  appliedJobs?: string[];
};

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      appliedJobs: new Set<string>(),

      addAppliedJob: (jobId: string) =>
        set((state) => ({
          appliedJobs: new Set(state.appliedJobs).add(jobId),
        })),

      hasApplied: (jobId: string) => {
        const token =
          typeof window !== "undefined"
            ? sessionStorage.getItem("accessToken")
            : null;
        return token ? get().appliedJobs.has(jobId) : false;
      },

      clearAppliedJobs: () => set({ appliedJobs: new Set<string>() }),

      loadAppliedJobs: async () => {
        try {
          const data = await getAppliedJobs();
          set({ appliedJobs: new Set(data.appliedJobs || []) });
        } catch (error) {
          console.error("Failed to load applied jobs:", error);
        }
      },
    }),
    {
      name: "application-storage",

      // Convert Set → Array before saving
      partialize: (state) => ({
        appliedJobs: Array.from(state.appliedJobs),
      }),

      // Convert Array → Set when rehydrating
      merge: (persistedState, currentState) => {
        const persisted = persistedState as PersistedState | undefined;

        return {
          ...currentState,
          appliedJobs: new Set(persisted?.appliedJobs ?? []),
        };
      },
    }
  )
);
