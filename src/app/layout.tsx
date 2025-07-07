
import type { Metadata } from 'next';
import { openSans, montserrat } from '@/lib/fonts';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ParticleBackground from '@/components/effects/particle-background';
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import GsapProvider from '@/components/gsap-provider';

export const metadata: Metadata = {
  title: "Shikhar's Portfolio",
  description: 'Personal portfolio of Shikhar KC, IT Support Specialist.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${montserrat.variable} font-sans antialiased`}>
        <ParticleBackground />
        <ThemeProvider defaultTheme="system">
          <GsapProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <ScrollToTopButton />
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
