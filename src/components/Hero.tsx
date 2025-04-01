
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Hero image with optimization */}
      <div className="absolute inset-0">
        <picture>
          <source 
            srcSet="/lovable-uploads/304411ce-3e6f-4334-b584-8b50cd4284c4.png"
            type="image/png"
          />
          <img
            src="/lovable-uploads/304411ce-3e6f-4334-b584-8b50cd4284c4.png"
            alt="Big Island Tech future vision with mountain, renewable energy and technology"
            className="w-full h-full object-cover"
            loading="eager" 
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="block">Big Island Tech</span>
            <span className="block text-3xl md:text-4xl mt-2">Innovation Community</span>
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Connecting innovators, entrepreneurs, and tech enthusiasts across Hawaii's Big Island and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="bg-hawaii-blue hover:bg-hawaii-blue/90 text-white" size="lg" asChild>
              <a href="#events">
                Upcoming Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" size="lg" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
