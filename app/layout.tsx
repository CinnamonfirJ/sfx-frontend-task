import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SFx Frontend",
  description: "SFx Frontend Interview Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${montserrat.variable}  antialiased overflow-x-hidden flex`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar />
            <main className='w-full'>
              <Providers>
                <Navbar />

                <div> {children}</div>
              </Providers>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
