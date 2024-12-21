import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "./redux-provider";
import QueryProvider from "./QueryClientProvider";
import { ResponsiveNavbar } from "@/components/ui/UI/Navbar/ResponsiveNavbar";

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
          <QueryProvider>
            <ResponsiveNavbar />
            <section>{children}</section>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
