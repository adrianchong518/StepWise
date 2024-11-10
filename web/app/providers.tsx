"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);

          if (!res.ok) {
            const error: any = new Error(
              "An error occurred while fetching the data.",
            );
            error.info = await res.json();
            error.status = res.status;
            console.error(error);
            throw error;
          }

          return await res.json();
        },
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </SWRConfig>
  );
}
