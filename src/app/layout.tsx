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
  title: "Ocak Turizm | Kesfet. Deneyimle. Hatirla.",
  description:
    "Ocak Turizm ile unutulmaz tatiller, ozel rotalar ve size ozel deneyimler. Misir, Fas, Ozbekistan ve Bosna Hersek turlari.",
  keywords: "turizm, tur, seyahat, misir, fas, ozbekistan, bosna hersek, tatil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} ${raleway.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
