import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "The OG Digitals | Digital Agency",
  description: "We build digital legacies. A bioluminescent cyberpunk digital agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black cursor-none lg:cursor-none" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} antialiased text-white bg-black cursor-none lg:cursor-none`}
        style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}
      >
        <LenisProvider>
          <CustomCursor />
          <Navigation />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
