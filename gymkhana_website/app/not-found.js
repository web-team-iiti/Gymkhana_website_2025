import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200">
          Page Not Found
        </h2>
        <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 rounded-full shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
