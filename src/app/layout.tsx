import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import { Provider } from "@/components/provider";
import { Toaster } from 'sonner'

const roboto = Roboto({ weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outstagram",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>{children}</Provider>
        <Toaster richColors closeButton position="top-right" toastOptions={{
          duration: 3000,
        }}/>
      </body>
    </html>
  );
}
