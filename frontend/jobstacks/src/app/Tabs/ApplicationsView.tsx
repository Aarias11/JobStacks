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

  return (
    <div className="w-full flex h-full">
      <section className="w-full overflow-y-auto h-screen">
        <div className="h-[75px] sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">Your Applications</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-5 rounded-xl border border-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Total</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{jobs.length}</p>
              <div className="w-14 h-14 rounded-full bg-neutral-900 p-1">
                <Doughnut
                  data={{
                    labels: ["Filled", "Remaining"],
                    datasets: [
                      {
                        data: [jobs.length, Math.max(0, 50 - jobs.length)],
                        backgroundColor: ["#3B82F6", "#E5E7EB"],
                        borderWidth: 0,
                        circumference: 360,
                        rotation: -90,
                      },
                    ],
                  }}
                  options={{ 
                    cutout: "80%", 
                    plugins: { 
                      legend: { display: false },
                      title: {
                        display: true,
                        text: 'Total',
                        position: 'center',
                        color: '#fff',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                      tooltip: { enabled: false }
                    },
                    animation: {
                      animateRotate: true,
                      animateScale: false
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-5 rounded-xl border border-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Saved</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'saved').length}</p>
              <div className="w-14 h-14 rounded-full bg-neutral-900 p-1">
                <Doughnut
                  data={{
                    labels: ["Saved", "Other"],
                    datasets: [
                      {
                        data: [
                          jobs.filter(j => j.status === 'saved').length,
                          Math.max(0, jobs.length - jobs.filter(j => j.status === 'saved').length)
                        ],
                        backgroundColor: ["#F59E42", "#E5E7EB"],
                        borderWidth: 0,
                        circumference: 360,
                        rotation: -90,
                      },
                    ],
                  }}
                  options={{ 
                    cutout: "80%", 
                    plugins: { 
                      legend: { display: false },
                      title: {
                        display: true,
                        text: 'Saved',
                        position: 'center',
                        color: '#fff',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                      tooltip: { enabled: false }
                    },
                    animation: {
                      animateRotate: true,
                      animateScale: false
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-5 rounded-xl border border-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Applied</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'applied').length}</p>
              <div className="w-14 h-14 rounded-full bg-neutral-900 p-1">
                <Doughnut
                  data={{
                    labels: ["Applied", "Other"],
                    datasets: [
                      {
                        data: [
                          jobs.filter(j => j.status === 'applied').length,
                          Math.max(0, jobs.length - jobs.filter(j => j.status === 'applied').length)
                        ],
                        backgroundColor: ["#10B981", "#E5E7EB"],
                        borderWidth: 0,
                        circumference: 360,
                        rotation: -90,
                      },
                    ],
                  }}
                  options={{ 
                    cutout: "80%", 
                    plugins: { 
                      legend: { display: false },
                      title: {
                        display: true,
                        text: 'Applied',
                        position: 'center',
                        color: '#fff',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                      tooltip: { enabled: false }
                    },
                    animation: {
                      animateRotate: true,
                      animateScale: false
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] p-5 rounded-xl border border-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Interviewing</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{jobs.filter(j => j.status === 'interview').length}</p>
              <div className="w-14 h-14 rounded-full bg-neutral-900 p-1">
                <Doughnut
                  data={{
                    labels: ["Interviewing", "Other"],
                    datasets: [
                      {
                        data: [
                          jobs.filter(j => j.status === 'interview').length,
                          Math.max(0, jobs.length - jobs.filter(j => j.status === 'interview').length)
                        ],
                        backgroundColor: ["#6366F1", "#E5E7EB"],
                        borderWidth: 0,
                        circumference: 360,
                        rotation: -90,
                      },
                    ],
                  }}
                  options={{ 
                    cutout: "80%", 
                    plugins: { 
                      legend: { display: false },
                      title: {
                        display: true,
                        text: 'Interviewing',
                        position: 'center',
                        color: '#fff',
                        font: {
                          size: 16,
                          weight: 'bold',
                        },
                      },
                      tooltip: { enabled: false }
                    },
                    animation: {
                      animateRotate: true,
                      animateScale: false
                    }
                  }}
                />
              </div>
            </div>
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
                    data: [jobs.filter((j) => j.status === "saved").length],
                    backgroundColor: "#F59E42",
                    stack: 'Stack 0',
                    barThickness: 30,
                  },
                  {
                    label: "Applied",
                    data: [jobs.filter((j) => j.status === "applied").length],
                    backgroundColor: "#10B981",
                    stack: 'Stack 0',
                    barThickness: 30,
                  },
                  {
                    label: "Interviewing",
                    data: [jobs.filter((j) => j.status === "interview").length],
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
