
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import MailerLiteForm from "./MailerLiteForm";

const CallToAction = () => {
  return (
    <section id="join" className="py-16 bg-hawaii-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Join Our Community?</h2>
            <p className="mt-4 text-lg text-white/90">
              Become a part of the Big Island Tech community and connect with innovators, entrepreneurs, and tech enthusiasts.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-white text-hawaii-blue hover:bg-gray-100" asChild>
                <a href="https://www.meetup.com/big-island-tech/" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2 h-5 w-5" />
                  Join Us on Meetup
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <MailerLiteForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
