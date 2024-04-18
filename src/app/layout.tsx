import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/components/Providers/AuthProvider";
import { ModeToggle } from "@/components/Theme-Switch";
import {Header} from "@/components/ui/Navbar";

const inter = Poppins({  weight: '400',
subsets: ['latin'],
display: 'swap', });

export const metadata: Metadata = {
  title: "DevFinder",
  description: "One Stop Platform for Developers to Connect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
      <NextTopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div style={{ height: "100px" }}>
            <Header/>
            </div>
            <div style={{ padding: "0 8%" }}>{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
