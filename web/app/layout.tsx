import { Roboto, Roboto_Mono } from "next/font/google";

import "@/app/global.css";
import { Providers } from "./providers";
import Navigation from "./components/Navigation";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`text-foreground bg-background ${roboto.variable} ${roboto_mono.variable}`}
      >
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
