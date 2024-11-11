"use client";

import { createStore } from "zustand/vanilla";

import { createGraphStore, GraphStore } from "./graph";

export type DemoStore = GraphStore;

export const createDemoStore = () =>
  createStore<DemoStore>()((...a) => ({
    ...createGraphStore(...a),
  }));

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type DemoStore, createDemoStore } from ".";

export type DemoStoreApi = ReturnType<typeof createDemoStore>;

export const DemoStoreContext = createContext<DemoStoreApi | undefined>(
  undefined,
);

export const DemoStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<DemoStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createDemoStore();
  }

  return (
    <DemoStoreContext.Provider value={storeRef.current}>
      {children}
    </DemoStoreContext.Provider>
  );
};

const useDemoStore = <T,>(selector: (store: DemoStore) => T): T => {
  const appStoreContext = useContext(DemoStoreContext);

  if (!appStoreContext) {
    throw new Error(`useDemoStore must be used within DemoStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
export default useDemoStore;
