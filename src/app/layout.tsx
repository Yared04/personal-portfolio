import { Bricolage_Grotesque, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Yared Tegegn - Software Engineer"
          key="title"
        />
        <meta
          property="og:description"
          content="Hello, I'm Yared Tegegn, a software engineer."
          key="description"
        />
        <meta
          property="og:image"
          content="/yared.png"
          key="image"
        />
        <meta name="google-site-verification" content="lb0QUVW43kkX_cxdRZaMfTGmI_l_auR04HM04o3t1gI" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${bricolage.variable} font-sans antialiased bg-[#030303] text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

