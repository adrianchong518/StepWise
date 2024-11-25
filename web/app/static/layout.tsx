import { ReactFlowProvider } from "@xyflow/react";
import { type Metadata } from "next";
import { StaticStoreProvider } from "./store";

export const metadata: Metadata = {
  title: "Demo | StepWise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StaticStoreProvider>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </StaticStoreProvider>
  );
}
