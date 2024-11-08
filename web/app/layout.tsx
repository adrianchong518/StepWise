import "@/app/global.css";
import { Roboto, Roboto_Mono } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const roboto_mono = Roboto_Mono({
  weight: ["100", "300", "400"],
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
    <html lang="en" className={`${roboto.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
