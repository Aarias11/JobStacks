import Image from "next/image";
import styles from "./page.module.css";
import Button from '@/components/Button/Button';
import Navbar from "@/components/Navbar/Navbar";

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
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-briefcase w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 7V6a2 2 0 012-2h2a2 2 0 012 2v1"/><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M2 13h20"/></svg>
              </div>
              <h3 className="text-xl font-medium text-primary">Full Job Lifecycle</h3>
              <p className="text-muted-foreground">Track applications from discovery to offer. See progress at a glance and never lose context.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-bar-chart-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3v18h18"/><rect width="4" height="6" x="7" y="9" rx="1"/><rect width="4" height="10" x="15" y="5" rx="1"/></svg>
              </div>
              <h3 className="text-xl font-medium text-primary">Built-in Analytics</h3>
              <p className="text-muted-foreground">Visualize your activity, identify trends, and optimize your job search strategy.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-layers w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <h3 className="text-xl font-medium text-primary">Organized & Taggable</h3>
              <p className="text-muted-foreground">Use tags, notes, and filters to keep everything tidy — no more spreadsheets or sticky notes.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-scan-line w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 8h.01"/><path d="M12 8h.01"/><path d="M8 8h.01"/></svg>
              </div>
              <h3 className="text-xl font-medium text-primary">AI-Powered Parsing</h3>
              <p className="text-muted-foreground">Extracts key job details from URLs automatically — saving you time and reducing manual input.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-lightbulb w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 13.25v1.75h8v-1.75A7 7 0 0 0 12 2z"/></svg>
              </div>
              <h3 className="text-xl font-medium text-primary">Smart Insights</h3>
              <p className="text-muted-foreground">Leverages LLMs to identify responsibilities, requirements, and hidden details from job descriptions.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-tags w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/><path d="M2 12v7a2 2 0 0 0 2 2h7l9-9-9-9H4a2 2 0 0 0-2 2z"/></svg>
              </div>
              <h3 className="text-xl font-medium text-primary">Automated Job Tagging</h3>
              <p className="text-muted-foreground">Our system uses AI to suggest relevant tags based on job content for faster filtering.</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
