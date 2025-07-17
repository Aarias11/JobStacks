import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import React, { useState, useEffect, useMemo } from "react";
import Modal from "@/components/Modal/Modal";
import {
  Search,
  Plus,
  MapPin,
  User,
  BadgeDollarSign
} from "lucide-react";
import JobCards from "@/components/JobCards/JobCards";
import { motion } from "framer-motion";

export default function DashboardView() {
  const [showModal, setShowModal] = useState(false);

  const [jobUrl, setJobUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search = searchTerm.toLowerCase();
      return (
        job.title?.toLowerCase().includes(search) ||
        job.company?.toLowerCase().includes(search) ||
        job.tags?.some((tag: string) => tag.toLowerCase().includes(search))
      );
    });
  }, [jobs, searchTerm]);

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

  const handleSubmit = async () => {
  if (!jobUrl.trim()) return;
  setShowModal(false); // Close the modal immediately
  try {
    setLoading(true);
    const res = await fetch("http://localhost:4000/api/ai/parse-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: jobUrl }),
      credentials: "include",
    });

    const data = await res.json();
    setJobs((prev) => [data, ...prev]);
    console.log("Job parsed:", data);
    setJobUrl("");
  } catch (err) {
    console.error("Failed to parse job:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full flex h-full ">
      <section className="w-full overflow-y-auto  h-screen">
        <div className="h-[75px]  sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">Dashboard</h3>
        </div>
        {/* Content */}
            {/* Search and Add Application Button */}
        <div className="w-full p-6 flex gap-4">
        <div className="relative ">
            <Input
              className="bg-surface pl-14 text-[16px] h-[53px]"
              placeholder="Search by company, title, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        <Search className="absolute top-4 left-4" size={20} />
        </div>
        <Button className="h-[53px] flex gap-4" onClick={() => setShowModal(true)}>
            <Plus />
            Add Application
        </Button>
        </div>
        {/* Stats Cards */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
          <div className="bg-surface p-4 rounded-xl shadow-sm border border-[#2a2a2a]">
            <h4 className="text-sm text-gray-400">Total Applications</h4>
            <p className="text-xl font-bold text-white mt-1">{jobs.length}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl shadow-sm border border-[#2a2a2a]">
            <h4 className="text-sm text-gray-400">Unique Companies</h4>
            <p className="text-xl font-bold text-white mt-1">{[...new Set(jobs.map(j => j.company))].length}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl shadow-sm border border-[#2a2a2a]">
            <h4 className="text-sm text-gray-400">Locations</h4>
            <p className="text-xl font-bold text-white mt-1">{[...new Set(jobs.flatMap(j => j.location || []))].length}</p>
          </div>
          <div className="bg-surface p-4 rounded-xl shadow-sm border border-[#2a2a2a]">
            <h4 className="text-sm text-gray-400">Status Types</h4>
            <p className="text-xl font-bold text-white mt-1">{[...new Set(jobs.map(j => j.status))].length}</p>
          </div>
        </div>
        {/* Application Cards Container */}
        <div className="px-6 mt-8 mb-4">
          <h2 className="text-lg font-semibold text-white mb-4">Applications</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setJobs(jobs.slice().reverse())}
              className="px-4 py-2 rounded-full text-sm bg-[#1E1E1E] border border-[#333] text-white hover:bg-[#2a2a2a] transition"
            >
              Sort by Date
            </button>
            <button
              onClick={() =>
                setJobs(jobs.slice().sort((a, b) => a.company.localeCompare(b.company)))
              }
              className="px-4 py-2 rounded-full text-sm bg-[#1E1E1E] border border-[#333] text-white hover:bg-[#2a2a2a] transition"
            >
              Sort by Company
            </button>
            <button
              onClick={() =>
                setJobs(jobs.slice().sort((a, b) => (a.location?.[0] || "").localeCompare(b.location?.[0] || "")))
              }
              className="px-4 py-2 rounded-full text-sm bg-[#1E1E1E] border border-[#333] text-white hover:bg-[#2a2a2a] transition"
            >
              Sort by Location
            </button>
            <button
              onClick={() =>
                setJobs(jobs.slice().sort((a, b) => a.status.localeCompare(b.status)))
              }
              className="px-4 py-2 rounded-full text-sm bg-[#1E1E1E] border border-[#333] text-white hover:bg-[#2a2a2a] transition"
            >
              Sort by Status
            </button>
            <button
              onClick={() =>
                setJobs(jobs.slice().sort((a, b) => {
                  const aSalary = parseInt((a.salary || "").replace(/[^0-9]/g, ""), 10);
                  const bSalary = parseInt((b.salary || "").replace(/[^0-9]/g, ""), 10);
                  return bSalary - aSalary;
                }))
              }
              className="px-4 py-2 rounded-full text-sm bg-[#1E1E1E] border border-[#333] text-white hover:bg-[#2a2a2a] transition"
            >
              Sort by Salary
            </button>
          </div>
        </div>
        <JobCards jobs={filteredJobs} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Add Job Posting</h2>
              <p className="text-sm text-gray-400">
                Paste the link to a job posting you'd like to track. We'll take care of the rest.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://careers.example.com/job/software-engineer"
                className="flex-1 bg-[#1E1E1E] text-white border border-[#333] focus:ring-2 focus:ring-primary focus:outline-none placeholder-gray-500 rounded-md px-4 py-3 text-sm"
              />
              <Button
                className="bg-primary hover:bg-primary/90 text-white text-sm px-6 py-3 rounded-md disabled:opacity-60"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </Modal>
      </section>
      {/* <section className="border-l border-[#272727] w-[400px] overflow-y-auto h-screen">
        <div className="h-auto sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">
            Companies You've Applied To
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {jobs.map((job: any) => (
            <div key={job._id} className="p-4 bg-[#1E1E1E] rounded-md border border-[#333]">
              <h4 className="text-lg font-semibold text-white">{job.title}</h4>
              <p className="text-sm text-gray-400">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location?.join(", ")}</p>
            </div>
          ))}
        </div>
      </section> */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-20 h-20 border-4 border-white border-t-primary rounded-full animate-spin"
          />
        </motion.div>
      )}
    </div>
  );
}
