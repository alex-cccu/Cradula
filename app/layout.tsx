import type { Metadata } from "next";
import {
  Poppins,
  Fontdiner_Swanky,
  Jua,
  New_Rocker,
  Galindo,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer/Footer";
import ThemeToggle from "@/components/Title/ThemeToggle";

const dreadful = localFont({
  src: "fonts/Dreadful-Regular.ttf",
  variable: "--font-dreadful",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600"],
});

const fontdinerSwanky = Fontdiner_Swanky({
  subsets: ["latin"],
  variable: "--font-fontdiner-swanky",
  weight: ["400"],
});

const jua = Jua({
  subsets: ["latin"],
  variable: "--font-jua",
  weight: ["400"],
});

const newRocker = New_Rocker({
  subsets: ["latin"],
  variable: "--font-new-rocker",
  weight: ["400"],
});

const galindo = Galindo({
  subsets: ["latin"],
  variable: "--font-galindo",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Cradula",
  description:
    "Cradula is a portfolio website showcasing projects, blogs and photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { theme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"bg-neutral-100 dark:bg-neutral-900 overflow-x-hidden"}>
        <Providers>
          <div>
            <div className="absolute top-5 left-5 z-20 fill-black">
              <ThemeToggle />
            </div>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
