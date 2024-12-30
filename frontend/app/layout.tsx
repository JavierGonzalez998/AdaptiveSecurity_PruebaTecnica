import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/navbar/navbar";
import { SessionStoreProvider } from "@/zustand/providers/sessionStateProvider";
const MontserratFont = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const PoppinsFont = Poppins({
  weight: ["400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refugio Patitas",
  description:
    "Refugio de animales en la ciudad de Chile. Adopta tu mascota, encuentra a tu nuevo mejor amigo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${MontserratFont.variable} ${PoppinsFont.variable} antialiased relative scroll-smooth bg-gray-100`}
      >
        <SessionStoreProvider>
          <Navbar />
          <div className="pt-5 lg:px-96">{children}</div>
          <Toaster/>
        </SessionStoreProvider>
      </body>
    </html>
  );
}
