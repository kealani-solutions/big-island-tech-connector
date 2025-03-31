
import React from 'react';
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import EventsSection from "../components/EventsSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <EventsSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
