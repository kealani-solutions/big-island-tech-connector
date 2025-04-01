export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  link: string;
}

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Smarter AI: How RAG, Agents & Workflows Transform LLMs into Intelligent Systems",
    date: "April 10, 2025",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "This month we will be discussing AI and how emerging patterns of software development are unlocking far more powerful capabilities than simple text or image generation. RAG is a method for retrieving trusted information to help answer your question before passing to an LLM. An Agent is software that self determines which of it's functions to use based on the problem it's solving. And Workflows combine multiple agents and software tools to automate end-to-end processes. This is all possible now and it is the future of how we will learn, work, and get stuff done.\n\nJoin us for this highly informative session presented by Mathew Goldsborough, Founder and CEO at NimbleBrain.ai based right here in Waimea, HI. Mat's experience spans AI, defense, e-commerce, and agriculture. Mark your calendars and RSVP now to join us on April 10th.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/1/2/8/600_525304392.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/306159379/",
  },
];

export const pastEvents: Event[] = [
  {
    id: 3,
    title: "Partnering with AI to Create Great User Experiences (UX)",
    date: "March 13, 2025",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "This month we are delighted to have Vincent Brathwaite sharing his experiences with us. Vincent is the CEO and Co-Founder @ gidens.com based in Oahu. He is a passionate speaker and educator in the area of design thinking and product design. His startup is building solutions to help small businesses easily manage the complexity of paperwork and compliance they can spend more time doing what they love.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/d/5/2/4/600_526134564.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/306059209/",
  },
  {
    id: 4,
    title: "From Vision to Reality: Building Technology Roadmaps That Actually Work",
    date: "February 12, 2025",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "Did you know that over 70% of digital transformations fail due to poor planning and lack of alignment? The result? Frustration, wasted resources, and unmet expectations for those trying to implement new technologies.\n\nIf you\’ve ever been part of a project that stalled or failed because vision and execution didn\’t align, this talk is for you. We\’ll explore a framework for creating technology roadmaps that bridge the gap between ambitious goals and actionable results. You\’ll learn how to align your innovation strategy with long-term objectives, prioritize technology investments, and avoid common pitfalls that derail even the best-intentioned plans.\n\nThrough real-world examples and insights from years of consulting experience, we\’ll break down practical strategies you can apply to your own projects. Whether you\’re an entrepreneur developing software, scaling a startup, or refining existing solutions, this session will equip you with the tools to transform vision into reality—and create roadmaps that actually work.\n\nJoin us to learn how to navigate complexity, inspire alignment, and map out a future of success!",
    imageUrl: "https://secure.meetupstatic.com/photos/event/c/4/0/c/600_525590188.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/305472520/",
  },
  {
    id: 5,
    title: "Your AI Assistant: A Practical Guide to Working with ChatGPT, Claude, and Gemini",
    date: "January 9, 2025",
    time: "4:00 PM - 5:30 PM HST",
    location: "VIRTUAL",
    description: "In our first meetup of 2025 we will get tips on how to effectively use AI assistants like ChatGPT, Claude, and Gemini to enhance your daily work and personal projects.\n\nIn this session, we'll explore practical examples of how AI can help with tasks ranging from writing and coding to learning and creative projects. You'll learn key strategies for communicating with AI tools to get better results, see real-world examples of AI in action, and gain confidence in using these powerful tools yourself. Whether you're a developer looking to streamline your workflow or someone curious about how AI can help with everyday tasks, you'll leave with practical knowledge and techniques you can start using right away.\n\nJoin us for an interactive session that demystifies AI assistants and shows you how to put them to work for you.",
    imageUrl: "https://secure.meetupstatic.com/photos/event/1/1/2/8/600_525304392.webp?w=750",
    link: "https://www.meetup.com/big-island-tech/events/305173606/",
  },
]; 