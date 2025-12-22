import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar at the top */}
      <Navbar />
      
      {/* 2. Main content area */}
      {/* pt-20 adds padding so content isn't hidden behind the fixed Navbar */}
      <main className="flex-grow pt-20 relative z-10">
        {children}
      </main>

      {/* 3. Footer at the bottom */}
      <Footer />
    </div>
  );
}