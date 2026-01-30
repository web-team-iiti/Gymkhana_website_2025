// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Image from "next/image";
// import AuthProvider from "@/context/AuthProvider";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata = {
//   title: "Student's Gymkhana - IIT Indore",
//   description: "An Organization for IIT Indore Students",
//   icons: {
//     icon: "/main_logo.png",  
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white flex flex-col relative`}
//       >
//         <AuthProvider>
//           <Navbar />
//           {/* Main content */}
//           <main className="flex-grow pt-14"> 
//             {children}
//           </main>
//           {/* Footer */}
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider"; // Keeping your existing import path

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
        {/* AuthProvider wraps EVERYTHING so session is available in Public AND Dashboard */}
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}