import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "GeoGuesser AI - Tebak Lokasi Dunia",
  description: "Permainan tebak lokasi foto dari seluruh dunia. Tebak seakurat mungkin!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
