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
}

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
    id: 10,
    title: "Big Island Tech Meetup",
    date: "October 9, 2025",
    dateISO: "2025-10-09",
    time: "",
    location: "VIRTUAL",
    description: "The October meetup will be virtual only.\n\nRSVP to get the Zoom link.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/6/a/6/600_528965798.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/308987165/"
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
    status: 'cancelled', // Manually marked as cancelled
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
    description: "This month we will be discussing AI and how emerging patterns of software development are unlocking far more powerful capabilities than simple text or image generation. RAG is a method for retrieving trusted information to help answer your question before passing to an LLM. An Agent is software that self determines which of it's functions to use based on the problem it's solving. And Workflows combine multiple agents and software tools to automate end-to-end processes. This is all possible now and it is the future of how we will learn, work, and get stuff done.\n\nJoin us for this highly informative session presented by Mathew Goldsborough, Founder and CEO at NimbleBrain.ai based right here in Waimea, HI. Mat's experience spans AI, defense, e-commerce, and agriculture. Mark your calendars and RSVP now to join us on April 10th.",
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
    description: "Through real-world examples and insights from years of consulting experience, we\'ll break down practical strategies you can apply to your own projects. Whether you\'re an entrepreneur developing software, scaling a startup, or refining existing solutions, this session will equip you with the tools to transform vision into reality—and create roadmaps that actually work.\n\nJoin us to learn how to navigate complexity, inspire alignment, and map out a future of success!",
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
    description: "In this session, we'll explore practical examples of how AI can help with tasks ranging from writing and coding to learning and creative projects. You'll learn key strategies for communicating with AI tools to get better results, see real-world examples of AI in action, and gain confidence in using these powerful tools yourself.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/1/2/8/600_525304392.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/305173606/",
  },
];

// For backwards compatibility, export the computed arrays
// These will automatically update based on the current date
export const upcomingEvents = getUpcomingEvents();
export const pastEvents = getPastEvents(); 