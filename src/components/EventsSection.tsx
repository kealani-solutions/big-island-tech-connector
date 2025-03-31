
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

// Sample events data - in a real application, this would come from an API
const upcomingEvents = [
  {
    id: 1,
    title: "AI and Machine Learning Workshop",
    date: "November 15, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Hawaii Innovation Hub, Hilo",
    description: "Join us for a hands-on workshop where we'll explore the basics of AI and machine learning, and how these technologies can be applied to solve real-world problems.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=300&h=200",
    link: "https://www.meetup.com/big-island-tech/",
  },
  {
    id: 2,
    title: "Renewable Energy Solutions",
    date: "December 5, 2023",
    time: "5:30 PM - 7:30 PM",
    location: "Kona Community Center",
    description: "Discover how innovative renewable energy technologies are being implemented on the Big Island and the impact they're having on our community and environment.",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300&h=200",
    link: "https://www.meetup.com/big-island-tech/",
  },
];

const pastEvents = [
  {
    id: 3,
    title: "Tech Networking Night",
    date: "October 20, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "Coconut Island Tech Hub, Hilo",
    description: "A casual evening of networking, idea-sharing, and community building among Big Island's tech enthusiasts and entrepreneurs.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300&h=200",
    link: "https://www.meetup.com/big-island-tech/",
  },
  {
    id: 4,
    title: "Web Development Workshop",
    date: "September 12, 2023",
    time: "5:00 PM - 7:00 PM",
    location: "Pahoa Community Center",
    description: "Learn the fundamentals of modern web development and how to create responsive and accessible websites.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=300&h=200",
    link: "https://www.meetup.com/big-island-tech/",
  },
];

const EventCard = ({ event }: { event: typeof upcomingEvents[0] }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardHeader className="pt-4 px-4 pb-0">
        <h3 className="font-bold text-xl">{event.title}</h3>
      </CardHeader>
      <CardContent className="px-4 py-2 flex-grow">
        <div className="flex items-start space-x-2 text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-start space-x-2 text-gray-600 mb-2">
          <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-start space-x-2 text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        <p className="text-gray-600 line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button className="w-full bg-hawaii-blue hover:bg-hawaii-blue/90 text-white" asChild>
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            View Details
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const EventsSection = () => {
  return (
    <section id="events" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Events</h2>
          <div className="mt-2 h-1 w-20 bg-hawaii-blue rounded-full mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Join us for exciting events and connect with the Big Island tech community.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="upcoming" className="w-full sm:w-auto">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past" className="w-full sm:w-auto">Past Events</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No upcoming events scheduled. Check back soon!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-hawaii-blue hover:bg-hawaii-blue/90 text-white" asChild>
            <a href="https://www.meetup.com/big-island-tech/events/" target="_blank" rel="noopener noreferrer">
              See All Events on Meetup
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
