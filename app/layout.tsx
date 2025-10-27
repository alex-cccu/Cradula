import type { Metadata } from "next";
import { Jua, Quicksand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer/Footer";
import ThemeToggle from "@/components/Header/ThemeToggle";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dreadful = localFont({
  src: "fonts/Dreadful-Regular.ttf",
  variable: "--font-dreadful",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "700"],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jua = Jua({
  subsets: ["latin"],
  variable: "--font-jua",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-neutral-100 dark:bg-neutral-900 overflow-x-hidden overflow-y-visible max-w-screen bg-size-[150px] 
      bg-[url('/CradulaBackgroundLight.png')] dark:bg-[url('/CradulaBackgroundDark.png')]"
      >
        <Providers>
          <div>
            <header
              className="absolute top-1 left-0 z-20 fill-black"
              suppressHydrationWarning
            >
              <ThemeToggle />
            </header>
            <main className="min-h-[calc(100vh-300px)]">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
