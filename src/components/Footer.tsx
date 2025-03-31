
import React from 'react';
import { Monitor } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
            <Monitor className="h-6 w-6 text-hawaii-teal mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-hawaii-blue to-hawaii-teal bg-clip-text text-transparent">
              Big Island Tech
            </span>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#events" className="text-gray-400 hover:text-white transition-colors">
              Events
            </a>
            <a href="https://www.meetup.com/big-island-tech/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Meetup
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Big Island Tech Community. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.meetup.com/big-island-tech/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              Meetup
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
