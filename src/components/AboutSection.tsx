import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Users, Lightbulb, Rocket } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What We're About</h2>
          <div className="mt-2 h-1 w-20 bg-hawaii-blue rounded-full mx-auto"></div>
        </div>

        <div className="prose prose-lg max-w-3xl mx-auto text-gray-600">
          <p>
            This group is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone. Through engaging discussions, knowledge sharing, and networking, we aim to foster a vibrant ecosystem of creativity and innovation.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Who should join?</h3>
          <p>
            Whether you're a seasoned entrepreneur, a technology professional, a curious student, or just someone excited about the possibilities of innovation, this group is for you. If you love learning, sharing ideas, and contributing to a thriving community, we'd love to have you join us.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-900 mt-12 mb-8">Why join?</h3>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          This group is a hub for collaboration, inspiration, and growth. By joining, you'll have the opportunity to:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card className="border border-gray-200 hover:shadow-md transition-shadow animate-slide-up">
            <CardContent className="p-6">
              <div className="rounded-full bg-hawaii-blue/10 w-12 h-12 flex items-center justify-center mb-4">
                <Monitor className="h-6 w-6 text-hawaii-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Connect with Leaders</h3>
              <p className="text-gray-600">Engage with local and global leaders in emerging technologies.</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow animate-slide-up">
            <CardContent className="p-6">
              <div className="rounded-full bg-hawaii-green/10 w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-hawaii-green" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Explore Cutting-Edge</h3>
              <p className="text-gray-600">Explore topics like renewable energy, ocean science, aerospace, AI, and more.</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow animate-slide-up">
            <CardContent className="p-6">
              <div className="rounded-full bg-hawaii-purple/10 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-hawaii-purple" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Build Relationships</h3>
              <p className="text-gray-600">Connect with like-minded individuals who share your passion for impact.</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow animate-slide-up">
            <CardContent className="p-6">
              <div className="rounded-full bg-hawaii-orange/10 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-hawaii-orange" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Grow Professionally</h3>
              <p className="text-gray-600">Find or offer mentorship, support, and opportunities to grow.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-medium text-gray-900 italic">Together, we can create something extraordinary. Let's build a brighter future, one meeting at a time!</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
