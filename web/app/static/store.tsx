"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { createStore, type StoreApi } from "zustand/vanilla";

export type StaticStore = {
  questionExpanded: boolean;
  setQuestionExpanded: (expanded: boolean) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;

  currentSample: string;
  setCurrentSample: (sample: string) => void;
};

const createStaticStore = () =>
  createStore<StaticStore>()((...a) => {
    const [set, get] = a;
    return {
      questionExpanded: true,
      setQuestionExpanded: (expanded) => {
        set({ questionExpanded: expanded });
      },

      currentStep: "",
      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      currentSample: "",
      setCurrentSample: (sampleId) => set({ currentSample: sampleId }),
    };
  });

export const StaticStoreContext = createContext<
  StoreApi<StaticStore> | undefined
>(undefined);

export const StaticStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<StaticStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createStaticStore();
  }

  return (
    <StaticStoreContext.Provider value={storeRef.current}>
      {children}
    </StaticStoreContext.Provider>
  );
};

const useStaticStore = <T,>(selector: (store: StaticStore) => T): T => {
  const appStoreContext = useContext(StaticStoreContext);

  if (!appStoreContext) {
    throw new Error(`useStaticStore must be used within StaticStoreProvider`);
  }

  return useStore(appStoreContext, useShallow(selector));
};
export default useStaticStore;
