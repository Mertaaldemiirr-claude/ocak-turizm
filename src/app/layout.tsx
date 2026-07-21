import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Ocak Turizm | Keşfet. Deneyimle. Hatırla.",
  description:
    "Ocak Turizm ile unutulmaz tatiller, özel rotalar ve size özel deneyimler. Mısır, Fas, Özbekistan ve Bosna Hersek turları.",
  keywords: "turizm, tur, seyahat, mısır, fas, özbekistan, bosna hersek, tatil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
