import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApplicationState {
  appliedJobs: Set<string>;
  addAppliedJob: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
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

      hasApplied: (jobId: string) => get().appliedJobs.has(jobId),
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
