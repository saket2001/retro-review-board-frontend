import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/ui/UI/Navbar/Navbar";
import { ReduxProvider } from "./redux-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Retro Board",
  description: "Sprint retrospective board for scrum teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased text-gray-700 bg-gray-200`}
      >
        <ReduxProvider>
          <Navbar></Navbar>
          <section className="px-2">{children}</section>
        </ReduxProvider>
      </body>
    </html>
  );
}
