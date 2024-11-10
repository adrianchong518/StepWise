import { type Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";

import "@/app/global.css";

import Navigation from "./components/Navigation";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["100", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "StepWise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`text-foreground bg-background font-sans ${roboto.variable} ${roboto_mono.variable}`}
      >
        <Providers>
          <div className="flex flex-col h-screen w-screen">
            <Navigation />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
