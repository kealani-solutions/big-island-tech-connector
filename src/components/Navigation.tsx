
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Info } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-icon.png"
                alt="Big Island Tech logo"
                className="w-[70px] h-[30px] object-contain"
              />
              <span className="text-xl font-bold text-hawaii-blue">
                Big Island Tech
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="flex items-center space-x-1" asChild>
              <a href="#about">
                <Info className="h-4 w-4 mr-1" />
                About
              </a>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1" asChild>
              <a href="#events">
                <Calendar className="h-4 w-4 mr-1" />
                Events
              </a>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-1" asChild>
              <a href="#join">
                <Users className="h-4 w-4 mr-1" />
                Join Us
              </a>
            </Button>
            <Button className="bg-hawaii-blue hover:bg-hawaii-blue/90 text-white ml-2" asChild>
              <a href="https://www.meetup.com/big-island-tech/" target="_blank" rel="noopener noreferrer">
                Visit Meetup
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
