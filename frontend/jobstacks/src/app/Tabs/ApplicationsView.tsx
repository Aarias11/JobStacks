"use client";
import JobCards from "@/components/JobCards/JobCards";
import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { Files, Bookmark, Send, Mic } from "lucide-react";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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

  const total = jobs.length;
  const savedCount = jobs.filter(j => j.status === 'saved').length;
  const appliedCount = jobs.filter(j => j.status === 'applied').length;
  const interviewCount = jobs.filter(j => j.status === 'interview').length;

  const savedPercentage = total ? (savedCount / total) * 100 : 0;
  const appliedPercentage = total ? (appliedCount / total) * 100 : 0;
  const interviewPercentage = total ? (interviewCount / total) * 100 : 0;

  return (
    <div className="w-full flex h-full">
      <section className="w-full overflow-y-auto h-screen">
        <div className="h-[75px] sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">Your Applications</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-4">
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-6 rounded-2xl border border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Files size={18} className="text-[#5895FF]" />
              <h4 className="uppercase text-sm tracking-wide text-neutral-400 font-medium">Total</h4>
            </div>
            <p className="text-4xl font-extrabold text-white">{jobs.length}</p>
            <p className="text-sm text-neutral-500">All job applications collected so far</p>
          </div>
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-6 rounded-2xl border border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Bookmark size={18} className="text-[#5895FF]" />
              <h4 className="uppercase text-sm tracking-wide text-neutral-400 font-medium">Saved</h4>
            </div>
            <p className="text-4xl font-extrabold text-white">{savedCount}</p>
            <p className="text-sm text-neutral-500">Jobs you have saved for later</p>
          </div>
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-6 rounded-2xl border border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Send size={18} className="text-[#5895FF]" />
              <h4 className="uppercase text-sm tracking-wide text-neutral-400 font-medium">Applied</h4>
            </div>
            <p className="text-4xl font-extrabold text-white">{appliedCount}</p>
            <p className="text-sm text-neutral-500">Jobs you have applied to</p>
          </div>
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-6 rounded-2xl border border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Mic size={18} className="text-[#5895FF]" />
              <h4 className="uppercase text-sm tracking-wide text-neutral-400 font-medium">Interviewing</h4>
            </div>
            <p className="text-4xl font-extrabold text-white">{interviewCount}</p>
            <p className="text-sm text-neutral-500">Jobs where you have interviews</p>
          </div>
        </div>
        <div className="px-6 pt-4">
          <div className="bg-surface p-4 rounded-md shadow-sm h-[400px]">
            <h4 className="text-lg font-semibold mb-2">Application Status Overview</h4>
            <Bar
              data={{
                labels: ["Applications"],
                datasets: [
                  {
                    label: "Saved",
                    data: [savedCount],
                    backgroundColor: "#F59E42",
                    stack: 'Stack 0',
                    barThickness: 30,
                  },
                  {
                    label: "Applied",
                    data: [appliedCount],
                    backgroundColor: "#10B981",
                    stack: 'Stack 0',
                    barThickness: 30,
                  },
                  {
                    label: "Interviewing",
                    data: [interviewCount],
                    backgroundColor: "#6366F1",
                    stack: 'Stack 0',
                    barThickness: 30,
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
        </div>
        <JobCards jobs={jobs} variant="grid" />
      </section>
    </div>
  );
}
