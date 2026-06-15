import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Student's Gymkhana - IIT Indore",
  description: "An Organization for IIT Indore Students",
  icons: {
    icon: "/main_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white bg-black`}> 
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}