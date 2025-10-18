import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative w-full py-30 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12">
        {/* Logo */}
        <div className="w-24 h-24 md:w-40 md:h-40 lg:h-60 lg:w-60 mb-6 relative">
          <Image
            src="/main_logo.png" // Place your logo here
            alt="Student Gymkhana IIT Indore Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 leading-tight">
          Student&apos;s Gymkhana
        </h1>
        <p className="text-2xl md:text-4xl font-semibold mt-2">
          IIT Indore
        </p>

        {/* Button */}
        {/* <button className="mt-8 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition duration-300">
          Know more
        </button> */}
      </div>
    </header>
  );
}
