import React from "react";

const events = [
  {
    id: 1,
    title: "Startup Networking Night",
    description:
      "Connect with entrepreneurs, investors, and mentors to grow your startup network.",
    image:
      "https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400",
  },
  {
    id: 2,
    title: "AI Innovation Summit",
    description:
      "Explore the latest in AI and machine learning with top industry leaders.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400",
  },
  {
    id: 3,
    title: "Design Thinking Workshop",
    description:
      "Learn how to solve problems creatively through hands-on design sessions.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400",
  },
];

const EventsPage = () => {
  return (
    <div className="min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Upcoming Events
      </h1>

      <div className="grid text-white sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-2 bg-transparent rounded-lg hover:border shadow max-w-96 hover:shadow-lg transition"
          >
            <img
              className="rounded-md max-h-80 w-full object-cover"
              src={event.image}
              alt={event.title}
            />
            <p className="text-xl font-semibold ml-2 mt-2">
              {event.title}
            </p>
            <p className="text-sm my-3 ml-2">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
