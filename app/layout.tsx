import type { Metadata } from "next";
import { Poppins, Jua } from "next/font/google";
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
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600"],
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
        className={
          "bg-neutral-100 dark:bg-neutral-900 overflow-x-hidden overflow-y-visible"
        }
      >
        <Providers>
          <div>
            <header
              className="absolute top-5 left-5 z-20 fill-black"
              suppressHydrationWarning
            >
              <ThemeToggle />
            </header>
            <main className="">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
