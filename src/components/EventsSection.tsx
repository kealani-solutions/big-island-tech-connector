import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Event, getUpcomingEvents, getPastEvents } from "@/data/events";

interface EventCardProps {
  event: Event;
  key?: number;
  isUpcoming?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isUpcoming }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardHeader className="pt-4 px-4 pb-0">
        <h3 className="font-bold text-xl">{event.title}</h3>
        {/* Show status badge for cancelled events */}
        {event.status === 'cancelled' && (
          <Badge variant="destructive" className="w-fit mt-2">
            Cancelled
          </Badge>
        )}
      </CardHeader>
      <CardContent className="px-4 py-2 flex-grow">
        <div className="flex flex-col space-y-2 mb-3">
          <div className="flex items-start space-x-2 text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-600 text-sm">
            <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-gray-700 line-clamp-6 text-sm leading-relaxed">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button className="w-full bg-hawaii-blue hover:bg-hawaii-blue/90 text-white" asChild>
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            {isUpcoming ? 'View Details and RSVP' : 'View Details'}
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const EventsSection: React.FC = () => {
  // Get dynamic event lists that automatically categorize based on current date
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

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
              <TabsTrigger value="upcoming" className="w-full sm:w-auto">
                Upcoming Events {upcomingEvents.length > 0 && `(${upcomingEvents.length})`}
              </TabsTrigger>
              <TabsTrigger value="past" className="w-full sm:w-auto">
                Past Events {pastEvents.length > 0 && `(${pastEvents.length})`}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} isUpcoming={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No upcoming events scheduled. Check back soon!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isUpcoming={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No past events to display.</p>
              </div>
            )}
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
