const events = [
  {
    title: "Annual Sports Festival 2025",
    date: "March 15-20, 2025",
    description: "Join us for the biggest sports event of the year with competitions across multiple disciplines.",
    tag: "Sports",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Cultural Night - Celebrating Diversity",
    date: "February 28, 2025",
    description: "An evening of music, dance, and performances showcasing our diverse student community.",
    tag: "Culture",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Leadership Summit Concluded",
    date: "January 30, 2025",
    description: "Over 200 students participated in our leadership development workshop with industry experts.",
    tag: "Workshop",
    status: "Past",
    statusColor: "bg-cyan-100 text-cyan-800",
  },
];

// Arrow function for a single event card
const EventCard = ({ event }) => (
  <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/90 transition-shadow hover:shadow-lg">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{event.date}</p>
      </div>
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${event.statusColor}`}>
        {event.status}
      </span>
    </div>
    <p className="text-gray-600 my-4">{event.description}</p>
    <span className="inline-block bg-white border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-md">
      {event.tag}
    </span>
  </div>
);

// Arrow function for the main News & Events section
const NewsAndEvents = () => (
  <section>
    <h2 className="text-3xl font-bold text-white mb-8">News & Events</h2>
    <div className="space-y-6">
      {events.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}
    </div>
  </section>
);

export default NewsAndEvents;
