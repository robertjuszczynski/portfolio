import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.scss";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Robert Juszczyński",
  description: "Portfolio of Robert Juszczyński",
  viewport: "width=device-width, initial-scale=1.0"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <body className={`${outfit.className} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
