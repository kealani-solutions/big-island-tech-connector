export interface Event {
  id: number;
  title: string;
  date: string; // Keep as readable string for display
  dateISO?: string; // Add ISO format for easy parsing
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  link: string;
  status?: 'upcoming' | 'past' | 'cancelled'; // Optional manual override
  meetupId?: string; // Meetup event ID extracted from URL
  lastSyncedAt?: string; // ISO timestamp of last sync
  syncStatus?: 'synced' | 'manual' | 'modified'; // Track if event was synced, manually added, or modified after sync
}

// Utility function to extract Meetup ID from event URL
export const extractMeetupId = (url: string): string | null => {
  const match = url.match(/\/events\/(\d+)\/?/);
  return match ? match[1] : null;
};

// Utility function to parse date and determine if event is past
export const isEventPast = (event: Event): boolean => {
  // If manually set as cancelled, treat as past
  if (event.status === 'cancelled') return true;
  if (event.status === 'upcoming') return false;
  if (event.status === 'past') return true;

  // Try to parse the dateISO first, then fall back to date string
  const eventDate = event.dateISO ? new Date(event.dateISO) : new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  
  return eventDate < today;
};

// Utility function to get upcoming events
export const getUpcomingEvents = (): Event[] => {
  return allEvents.filter(event => !isEventPast(event)).sort((a, b) => {
    const dateA = a.dateISO ? new Date(a.dateISO) : new Date(a.date);
    const dateB = b.dateISO ? new Date(b.dateISO) : new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

// Utility function to get past events
export const getPastEvents = (): Event[] => {
  return allEvents.filter(event => isEventPast(event)).sort((a, b) => {
    const dateA = a.dateISO ? new Date(a.dateISO) : new Date(a.date);
    const dateB = b.dateISO ? new Date(b.dateISO) : new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });
};

/**
 * SINGLE SOURCE OF TRUTH FOR ALL EVENTS
 * 
 * To add a new event from Meetup:
 * 1. Run: node scripts/event-manager.js template
 * 2. Copy event details from Meetup.com into the template
 * 3. Add the event object to the TOP of this array
 * 4. The system will automatically categorize as upcoming/past
 * 
 * To mark an event as cancelled:
 * 1. Add status: 'cancelled' to the event object
 * 2. The event will show in "Past Events" with a cancelled badge
 */
export const allEvents: Event[] = [
  {
    id: 18,
    title: "Big Island Tech Meetup",
    date: "June 11, 2026",
    dateISO: "2026-06-11",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The June meetup will be virtual only. RSVP to get the Google Meet link. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we’d love to have you join us. Agenda: • 4:00 - 4:05 PM: Gather and chat while everyone arrives Share something interesting with the group. • 4:05 - 4:20 PM: News, Jobs, and Announcements Share or hear about the latest deve",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/2/5/2/highres_531773842.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/312423450/?eventOrigin=group_events_list",
    meetupId: "312423450",
    lastSyncedAt: "2026-02-09T19:18:31.109Z",
    syncStatus: "synced",
  },
  {
    id: 17,
    title: "Big Island Tech Meetup",
    date: "May 14, 2026",
    dateISO: "2026-05-14",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The May meetup will be virtual only. RSVP to get the Google Meet link. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we’d love to have you join us. Agenda: • 4:00 - 4:05 PM: Gather and chat while everyone arrives Share something interesting with the group. • 4:05 - 4:20 PM: News, Jobs, and Announcements Share or hear about the latest devel",
    imageUrl: "https://secure.meetupstatic.com/photos/event/e/3/f/e/highres_531718366.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/312376177/?eventOrigin=group_events_list",
    meetupId: "312376177",
    lastSyncedAt: "2026-02-09T19:18:31.109Z",
    syncStatus: "synced",
  },
  {
    id: 16,
    title: "Big Island Tech Meetup - Alexander García-Tobar - Agentic Trust",
    date: "April 9, 2026",
    dateISO: "2026-04-09",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The April meetup will be virtual only. RSVP to get the Google Meet link. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we’d love to have you join us. Agenda: • 4:00 - 4:05 PM: Gather and chat while everyone arrives Share something interesting with the group. • 4:05 - 4:20 PM: News, Jobs, and Announcements Share or hear about the latest dev",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/6/c/b/highres_531714987.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/312372203/?eventOrigin=group_events_list",
    meetupId: "312372203",
    lastSyncedAt: "2026-02-09T19:18:31.109Z",
    syncStatus: "synced",
  },
  {
    id: 15,
    title: "Big Island Tech Meetup at Hawaii Island AI Summit",
    date: "March 12, 2026",
    dateISO: "2026-03-12",
    time: "11:00 AM - 12:30 PM HST",
    location: "The Arc of Hilo",
    description: "The March meetup has been merged with the Hawaii Island AI Summit. I invite you all to meet In Person. Get your discounted Early Bird tickets through Luma https://luma.com/hiaisummit For more information visit the official Summit web site: https://hawaiiaisummit.com/ • 11:00 AM: Doors Open Blessing, registration, and networking. • 11:30 AM: Keynote Presentations Insights from influential local leaders. • 12:15 PM: Lunch Local kine food and networking • 1:00 PM: Workshop Sessions Choose your track: Builders or Leaders • 3:00 PM: Talk Story Panel AI & the Future of Work — open discussion with panelists • 4:00 AM: Paul Hana Networking Connect with speakers, sponsors, and fellow attendees until 6:00 PM We look forward to seeing you there and sparking conversations that inspire innovation!",
    imageUrl: "https://secure.meetupstatic.com/photos/event/7/5/e/8/highres_532650184.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/312372179/?eventOrigin=group_events_list",
    meetupId: "312372179",
    lastSyncedAt: "2026-02-19T18:55:15.675Z",
    syncStatus: "synced",
  },
  {
    id: 14,
    title: "Big Island Tech Meetup - Valerie L. Harmon - Nāmaka Algae Inc",
    date: "February 12, 2026",
    dateISO: "2026-02-12",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The February meetup will be virtual only. RSVP to get the Google Meet link. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we’d love to have you join us. Agenda: • 4:00 - 4:05 PM: Gather and chat while everyone arrives Share something interesting with the group. • 4:05 - 4:20 PM: News, Jobs, and Announcements Share or hear about the latest ",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/6/9/7/highres_531714935.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/312372161/?eventOrigin=group_events_list",
    meetupId: "312372161",
    lastSyncedAt: "2026-02-09T19:18:31.109Z",
    syncStatus: "synced",
  },
  {
    id: 13,
    title: "Big Island Tech Meetup - Dana McLaughlin - Hawaiʻi Keiki Museum",
    date: "January 8, 2026",
    dateISO: "2026-01-08",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "Happy New Year! 2026 is going to be a great year! The January meetup will be virtual only. RSVP to get the Google Meet link. Dana McLaughlin will be speaking about Island Science Literacy: Why Our Community Can’t Afford to Leave Kids Behind in Science and Math The technology divide is not about devices; it’s about who gets to tinker, experiment, and learn by doing. I love this topic! Ma ka hana ka ʻike is my mantra. Come join us and be part of the conversation. Thursday at 4pm. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology profession",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/6/7/b/highres_531714907.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/312372137/?eventOrigin=group_events_list",
    meetupId: "312372137",
    lastSyncedAt: "2026-01-07T18:11:23.277Z",
    syncStatus: "synced",
  },
  {
    id: 12,
    title: "Big Island Tech Meetup - Happy Holidays",
    date: "December 11, 2025",
    dateISO: "2025-12-11T00:00:00Z",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The December meetup will be virtual only. RSVP to get the Google Meet link. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we’d love to have you join us. Agenda: • 4:00 - 4:05 PM: Gather and chat while everyone arrives Share something interesting with the group. • 4:05 - 4:20 PM: News, Jobs, and Announcements Share or hear about the latest ",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/7/0/3/highres_531715043.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/311078712/?eventOrigin=group_events_list",
    meetupId: "311078712",
    lastSyncedAt: "2025-12-10T18:11:39.530Z",
    syncStatus: "synced",
  },
  {
    id: 11,
    title: "Big Island Tech Meetup - Build an Agent",
    date: "November 13, 2025",
    dateISO: "2025-11-13T00:00:00Z",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The November meetup will be virtual only. RSVP to get the Google Meet link. Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation. Whether you’re a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we’d love to have you join us. Agenda: • 4:00 - 4:05 PM: Gather and chat while everyone arrives Share something interesting with the group. • 4:05 - 4:20 PM: News, Jobs, and Announcements Share or hear about the latest ",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/6/a/6/highres_528965798.webp?w=3840",
    link: "https://www.meetup.com/big-island-tech/events/311078708/?eventOrigin=group_events_list",
    meetupId: "311078708",
    lastSyncedAt: "2025-10-19T18:08:48.186Z",
    syncStatus: "synced",
  },
  {
    id: 10,
    title: "Big Island Tech Meetup",
    date: "October 9, 2025",
    dateISO: "2025-10-09",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The October meetup will be virtual only.\n\nRSVP to get the Zoom link.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/6/a/6/600_528965798.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/308987165/",
    meetupId: "308987165",
    syncStatus: "manual",
  },
  {
    id: 9,
    title: "Big Island Tech Meetup",
    date: "September 11, 2025",
    dateISO: "2025-09-11",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The September meetup will be virtual only.\n\nRSVP to get the Zoom link.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/6/a/6/600_528965798.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/308986999/",
    meetupId: "308986999",
    syncStatus: "manual",
  },
  {
    id: 8,
    title: "Big Island Tech Meetup at NELHA (Aquaculture field trip!)",
    date: "August 14, 2025",
    dateISO: "2025-08-14",
    time: "4:00 PM - 5:30 PM HST",
    location: "NELHA Hale Iako",
    description: "The August meetup will be IN PERSON at NELHA Hale Iako. We will get a tour and tech talk from the amazing team at Ocean Era. Join us IN PERSON on our first Big Island Tech field trip.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/7/d/9/7/600_528332151.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/307172893/",
  },
  {
    id: 7,
    title: "[RESCHEDULED]Big Island Tech Meetup - Canceled this month",
    date: "July 10, 2025",
    dateISO: "2025-07-10",
    time: "4:00 PM - 5:30 PM HST",
    location: "NELHA Hale Iako",
    description: "Meetup is cancelled due to unforeseen circumstances. See you next month!",
    imageUrl: "https://secure.meetupstatic.com/photos/event/5/7/0/e/600_527242286.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/307172887/",
    status: 'cancelled',
  },
  {
    id: 6,
    title: "Big Island Tech Meetup - Low-Code AI Workflows",
    date: "June 12, 2025",
    dateISO: "2025-06-12",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The June meetup will be virtual only.\n\nThis month we will be learning how to build automated workflows and AI agents without knowing anything about software development. Michelle Dumais will be walking us through the process of building an agent for free on n8n.io.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/7/d/f/2/600_528332242.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/307172884/",
  },
  {
    id: 5,
    title: "Big Island Tech Meetup - Vibe Coding",
    date: "May 8, 2025",
    dateISO: "2025-05-08",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "The May meetup will be virtual only.\n\nBig Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/5/7/0/e/600_527242286.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/307172733/",
  },
  {
    id: 4,
    title: "Smarter AI: How RAG, Agents & Workflows Transform LLMs into Intelligent Systems",
    date: "April 10, 2025",
    dateISO: "2025-04-10",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "This month we will be discussing AI and how emerging patterns of software development are unlocking far more powerful capabilities than simple text or image generation. RAG is a method for retrieving trusted information to help answer your question before passing to an LLM. An Agent is software that self determines which of its functions to use based on the problem it",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/1/2/8/600_525304392.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/306159379/",
  },
  {
    id: 3,
    title: "Partnering with AI to Create Great User Experiences (UX)",
    date: "March 13, 2025",
    dateISO: "2025-03-13",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "This month we are delighted to have Vincent Brathwaite sharing his experiences with us. Vincent is the CEO and Co-Founder @ gidens.com based in Oahu. He is a passionate speaker and educator in the area of design thinking and product design. His startup is building solutions to help small businesses easily manage the complexity of paperwork and compliance they can spend more time doing what they love.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/5/2/4/600_526134564.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/306059209/",
  },
  {
    id: 2,
    title: "Building Technology Roadmaps That Actually Work",
    date: "February 12, 2025",
    dateISO: "2025-02-12",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "Through real-world examples and insights from years of consulting experience, we",
    imageUrl: "https://secure.meetupstatic.com/photos/event/c/4/0/c/600_525590188.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/305472520/",
  },
  {
    id: 1,
    title: "A Practical Guide to Working with ChatGPT, Claude, and Gemini",
    date: "January 9, 2025",
    dateISO: "2025-01-09",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "In this session, we",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/1/2/8/600_525304392.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/305173606/",
  },
];

// For backwards compatibility, export the computed arrays
// These will automatically update based on the current date
export const upcomingEvents = getUpcomingEvents();
export const pastEvents = getPastEvents(); 