"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

// --- mockEvents (same as you provided) ---
const mockEvents = [
  {
    id: 1,
    title: "Gymkhana Sports",
    subtitle: "Inter-Hostel Tournament",
    date: "Oct 28, 2025",
    description: "Annual inter-hostel sports competition. Come cheer for your hostel!",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Gymkhana+Sports",
  },
  {
    id: 2,
    title: "Cultural Night",
    subtitle: "Rhythm of India",
    date: "Nov 05, 2025",
    description: "A celebration of diverse Indian art forms, music, and dance.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Cultural+Night",
  },
  {
    id: 3,
    title: "Tech Workshop",
    subtitle: "AI & Machine Learning",
    date: "Nov 12, 2025",
    description: "Hands-on workshop on the fundamentals of AI and ML with Python.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Tech+Workshop",
  },
  {
    id: 4,
    title: "Academic Seminar",
    subtitle: "Career Pathways",
    date: "Nov 15, 2025",
    description: "Learn about diverse career opportunities after graduation from industry experts.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Career+Seminar",
  },
  {
    id: 5,
    title: "Coding Competition",
    subtitle: "Code Sprint '25",
    date: "Nov 20, 2025",
    description: "Put your problem-solving skills to the test in our annual coding sprint.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Code+Sprint",
  },
];

// --- EventCard ---
const EventCard = ({ event }) => {
  return (
    <div
      className="flex-shrink-0 w-80 snap-start bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg 
      shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 
      hover:border-blue-400 relative group"
      style={{ minWidth: 320 /* ensure consistent width */ }}
    >
      <img
        className="w-full h-40 object-cover transition-all duration-300 group-hover:opacity-80"
        src={event.imageUrl}
        alt={event.title}
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400/1a202c/9ca3af?text=Event+Image";
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{event.title}</h3>
        <p className="text-sm font-medium text-blue-400">{event.subtitle}</p>

        <div className="flex items-center text-xs text-gray-400 mt-3">
          <FaCalendarAlt className="mr-2 text-gray-400" />
          <span>{event.date}</span>
        </div>

        <p className="mt-3 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {event.description}
        </p>

        <a
          href="#"
          className="inline-block mt-4 text-blue-400 font-medium text-sm transition-colors hover:text-blue-300"
        >
          Learn More &rarr;
        </a>
      </div>
    </div>
  );
};

// --- Main UpcomingEvents with robust auto-scroll ---
const UpcomingEvents = () => {
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);
  const isHoveringRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate children are used so content width > container width
    // Ensure the container scroll width is larger than client width before starting
    const ensureReady = () => {
      // small timeout to let layout settle
      setTimeout(() => {
        if (scroller.scrollWidth > scroller.clientWidth) {
          setIsReady(true);
        } else {
          // if not yet overflowing, wait and try again (handles responsive / small screens)
          setTimeout(ensureReady, 250);
        }
      }, 50);
    };
    ensureReady();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !isReady) return;

    // Use requestAnimationFrame for smoothness
    let last = performance.now();
    const speed = 0.04; // pixels per millisecond (tweak to taste)
    const step = (now) => {
      const elapsed = now - last;
      last = now;

      if (!isHoveringRef.current) {
        // Temporarily disable smooth scrolling to avoid janky jumps
        const prevBehavior = scroller.style.scrollBehavior;
        scroller.style.scrollBehavior = "auto";
        scroller.scrollLeft += speed * elapsed;
        scroller.style.scrollBehavior = prevBehavior;

        // If scrolled to the duplicated midpoint, reset to start to loop seamlessly
        // We duplicated the list once, so when scrollLeft >= originalWidth, reset by subtracting originalWidth
        const singleWidth = scroller.scrollWidth / 2; // since we duplicate once
        if (scroller.scrollLeft >= singleWidth) {
          scroller.scrollLeft -= singleWidth;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isReady]);

  // pause on hover/focus
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onEnter = () => (isHoveringRef.current = true);
    const onLeave = () => (isHoveringRef.current = false);
    const onFocus = () => (isHoveringRef.current = true);
    const onBlur = () => (isHoveringRef.current = false);

    scroller.addEventListener("mouseenter", onEnter);
    scroller.addEventListener("mouseleave", onLeave);
    scroller.addEventListener("focusin", onFocus);
    scroller.addEventListener("focusout", onBlur);

    return () => {
      scroller.removeEventListener("mouseenter", onEnter);
      scroller.removeEventListener("mouseleave", onLeave);
      scroller.removeEventListener("focusin", onFocus);
      scroller.removeEventListener("focusout", onBlur);
    };
  }, []);

  return (
    <div className="w-full py-16 bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl my-2 font-bold text-center text-white uppercase tracking-wider">
          Upcoming Events
        </h2>

        {/* Scroller: duplicate list for looping */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto py-6 snap-x snap-mandatory scroll-smooth"
          tabIndex={0} // make focusable so keyboard users can pause via focus
          style={{
            // hide native scrollbar on some browsers (keeps UX cleaner)
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* two copies for seamless looping */}
          {[...mockEvents, ...mockEvents].map((event, idx) => (
            <EventCard key={`${event.id}-${idx}`} event={event} />
          ))}
        </div>
      </div>
      {/* small style to hide scrollbar for webkit */}
      <style>{`
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
      <div onClick={()=>router.push('/events')} className="mt-4 flex justify-center">
        <button className="bg-blue-700 hover:bg-blue-800 rounded-full p-1 py-2 px-2">View All Events</button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
