import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Student's Gymkhana - IIT Indore",
  description: "An Organization for IIT Indore Students",
  icons: {
    icon: "/main_logo.png", // favicon logo
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
      >
        Background image for all pages
        {/* <div className="fixed inset-0 z-[-10]">
          <Image
            src="/bgimg.png"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div> */}

        {/* Navbar with logo */}
        {/* <Navbar className="relative z-20"/> */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow pt-14">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
