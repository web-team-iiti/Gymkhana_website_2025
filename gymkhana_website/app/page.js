import Councils from "@/components/Councils";
import NewsAndEvents from "@/components/NewsEvents";

export default function HomePage() {
  return (
    <div className="text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-3">
            <NewsAndEvents />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <Councils />
          </div>

        </div>
      </main>
    </div>
  );
}

