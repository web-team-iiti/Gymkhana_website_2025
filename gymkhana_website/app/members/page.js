import { FaLinkedin, FaEnvelope } from "react-icons/fa";

// Single compact profile card
const ProfileCard = ({ profile }) => (
  <div className="relative bg-white rounded-2xl shadow-lg p-4 w-72 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
    
    {/* Profile Image */}
    <div className="relative w-24 h-24 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center p-1">
      <img
        src={profile.image}
        alt={`Profile of ${profile.name}`}
        className="rounded-full object-cover"
        width={100}
        height={100}
      />
    </div>

    {/* Name */}
    <h2 className="text-lg font-bold mt-6 text-gray-800">{profile.name}</h2>

    {/* Position / Location */}
    <p className="text-sm text-gray-500 font-light my-2 truncate">{profile.position}</p>

    {/* Separator */}
    <div className="w-1/2 border-t border-gray-600/50 my-3 mx-auto" />

    {/* Social Icons */}
    <div className="flex justify-center p-3 gap-4 text-gray-700">
      {profile.linkedin && (
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="hover:text-blue-500 transition-opacity"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
      )}
      {profile.email && (
        <a
          href={`mailto:${profile.email}`}
          aria-label="Send Email"
          className="hover:opacity-75 transition-opacity"
        >
          <FaEnvelope className="w-5 h-5" />
        </a>
      )}
    </div>
  </div>
);

// Example profiles array
const profiles = [
  {
    name: "Mizko Adrian",
    position: "Sydney, Australia",
    image: "https://placehold.co/104x104/a78bfa/FFFFFF?text=MA&font=sans",
    linkedin: "#",
    email: "adrian@example.com",
  },
  {
    name: "Naveen Sharma",
    position: "President, Student's Gymkhana",
    image: "https://placehold.co/104x104/334155/FFFFFF?text=NS&font=sans",
    linkedin: "#",
    email: "naveen@example.com",
  },
  {
    name: "Amit Singh",
    position: "Vice President, Student's Gymkhana",
    image: "https://placehold.co/104x104/334155/FFFFFF?text=AS&font=sans",
    linkedin: "#",
    email: "amit@example.com",
  },
];

// Grid component to display multiple cards
const ProfileGrid = () => (
  <div className="flex flex-wrap justify-center mt-8 gap-6 p-6">
    {profiles.map((profile, idx) => (
      <ProfileCard key={idx} profile={profile} />
    ))}
  </div>
);

export default ProfileGrid;
