// Example logos (replace with actual image URLs)
const councils = [
    {
        name: "Sports Council",
        logo: "https://placehold.co/48x48/4ade80/FFFFFF?text=S",
        description: "The Sports Council is the voice and face of IIT Indore sports community, responsible for management and conduction of all sporting events in the campus."
    },
    {
        name: "Cultural Council",
        logo: "https://placehold.co/48x48/facc15/FFFFFF?text=C",
        description: "The Cultural Council of IIT Indore orchestrates a diverse array of cultural events throughout the year, fostering artistic expression and community engagement among students and faculty alike."
    },
    {
        name: "Academic Council",
        logo: "https://placehold.co/48x48/60a5fa/FFFFFF?text=A",
        description: "The Academics Council has been trusted with the responsibility of managing executive activities in two of the most crucial aspects of student life - Academics and Career."
    },
    {
        name: "Science and Technology Council",
        logo: "https://placehold.co/48x48/f472b6/FFFFFF?text=S&T",
        description: "The SnT Council of IIT Indore is a community of science and technology enthusiasts who love to explore the unthinkable."
    }
];

function CouncilCard({ council }) {
    return (
        <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/90 transition-shadow hover:shadow-lg hover:border-gray-300 flex items-start gap-4">
            {/* Logo */}
            <img src={council.logo} alt={`${council.name} logo`} className="w-12 h-12 rounded-full object-cover" />
            
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{council.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{council.description}</p>
            </div>
        </div>
    );
}

export default function Councils() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Councils</h2>
            <div className="space-y-6">
                {councils.map((council) => (
                    <CouncilCard key={council.name} council={council} />
                ))}
            </div>
        </section>
    );
}
