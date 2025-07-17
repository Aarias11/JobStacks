"use client";
import JobCards from "@/components/JobCards/JobCards";
import React, { useState, useEffect, useMemo } from "react";

export default function ApplicationsView() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);



  
   useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/applications", {
          credentials: "include",
        });
        const data = await res.json();
        setJobs(Array.isArray(data.applications) ? data.applications : []);
        console.log("Fetched jobs:", data.applications);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
  
    fetchJobs();
  }, []);

  return (
    <div className="w-full flex h-full">
      <section className="w-full overflow-y-auto h-screen">
        <div className="h-[75px] sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">Your Applications</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
          <div className="bg-surface p-4 rounded-md shadow-sm">
            <p className="text-sm text-text-secondary">Total</p>
            <p className="text-lg font-semibold">{jobs.length}</p>
          </div>
          <div className="bg-surface p-4 rounded-md shadow-sm">
            <p className="text-sm text-text-secondary">Saved</p>
            <p className="text-lg font-semibold">{jobs.filter(j => j.status === 'saved').length}</p>
          </div>
          <div className="bg-surface p-4 rounded-md shadow-sm">
            <p className="text-sm text-text-secondary">Applied</p>
            <p className="text-lg font-semibold">{jobs.filter(j => j.status === 'applied').length}</p>
          </div>
          <div className="bg-surface p-4 rounded-md shadow-sm">
            <p className="text-sm text-text-secondary">Interviewing</p>
            <p className="text-lg font-semibold">{jobs.filter(j => j.status === 'interview').length}</p>
          </div>
        </div>
        <JobCards jobs={jobs} variant="grid" />
      </section>
    </div>
  );
}
