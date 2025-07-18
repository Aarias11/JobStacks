import Image from "next/image";
import styles from "./page.module.css";
import Button from '@/components/Button/Button';
import Navbar from "@/components/Navbar/Navbar";
import FeatureCard from '@/components/FeatureCards/FeatureCards';
import {
  Briefcase,
  BarChart3,
  Layers,
  ScanLine,
  Lightbulb,
  Tags
} from "lucide-react";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center  bg-gradient-to-b from-background to-surface">
      <Navbar />
      
      <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight my-6 pt-5">
        Organize Your Job Hunt, <br className="hidden sm:inline" /> Win More Offers
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 text-text-secondary">
        From saved listings to successful interviews — manage every stage of your job search with clarity and confidence using JobStacks.
      </p>
      <div className="relative w-full max-w-6xl h-[600px] mb-10 rounded-2xl overflow-hidden">
        <Image
          src="/hero_2.png"
          alt="Job tracking illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Why JobStacks Section */}
      <section className="w-full bg-background py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-6xl font-semibold text-primary mb-6">Why JobStacks?</h2>
          <p className="text-muted-foreground mb-12 text-lg">We built JobStacks to give modern jobseekers the tools they actually need.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <FeatureCard
              icon={Briefcase}
              title="Full Job Lifecycle"
              description="Track applications from discovery to offer. See progress at a glance and never lose context."
            />
            <FeatureCard
              icon={BarChart3}
              title="Built-in Analytics"
              description="Visualize your activity, identify trends, and optimize your job search strategy."
            />
            <FeatureCard
              icon={Layers}
              title="Organized & Taggable"
              description="Use tags, notes, and filters to keep everything tidy — no more spreadsheets or sticky notes."
            />
            <FeatureCard
              icon={ScanLine}
              title="AI-Powered Parsing"
              description="Extracts key job details from URLs automatically — saving you time and reducing manual input."
            />
            <FeatureCard
              icon={Lightbulb}
              title="Smart Insights"
              description="Leverages LLMs to identify responsibilities, requirements, and hidden details from job descriptions."
            />
            <FeatureCard
              icon={Tags}
              title="Automated Job Tagging"
              description="Our system uses AI to suggest relevant tags based on job content for faster filtering."
            />
          </div>
        </div>
      </section>
    </section>
  );
}
