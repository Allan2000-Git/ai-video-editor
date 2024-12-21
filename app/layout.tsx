import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./(components)/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Montivo: Revolutionize Your Video Creation with AI-Powered Editing Tools",
  description: "Montivo is the ultimate AI-driven video editor, offering seamless video generation, precise editing, and professional-grade tools. Bring your stories to life with effortless creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          <Providers>
                {children}
                <Toaster richColors toastOptions={{closeButton: true, duration: 3000}} />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
