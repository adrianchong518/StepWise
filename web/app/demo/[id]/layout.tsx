import { ReactFlowProvider } from "@xyflow/react";
import { type Metadata } from "next";

import { DemoStoreProvider } from "./store";

export const metadata: Metadata = {
  title: "Demo | StepWise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactFlowProvider>
      <DemoStoreProvider>{children}</DemoStoreProvider>
    </ReactFlowProvider>
  );
}
