import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import {
  MapPin,
  User,
  BadgeDollarSign
} from "lucide-react";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string[];
  salary: string;
  techStack: string[];
  status: string;
  companyLogo: string;
  createdAt: string;
};

type JobCardsProps = {
  jobs: Job[];
  variant?: "default" | "grid";
  onStatusClick?: (jobId: string, currentStatus: string) => void;
};

export default function JobCards({ jobs, variant = "default", onStatusClick }: JobCardsProps) {
  const isGrid = variant === "grid";
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [jobList, setJobList] = useState<Job[]>([]);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  function getTechIconUrl(name: string) {
    const normalized = name
      .toLowerCase()
      .replace(/\+/g, "plus")
      .replace(/#/g, "sharp")
      .replace(/\s+/g, "");
    return `/tech-icons/${normalized}.svg`;
  }

  const handleStatusClick = (e: React.MouseEvent, jobId: string, currentStatus: string) => {
    e.preventDefault();
    if (activeTooltip === jobId) {
      setActiveTooltip(null);
    } else {
      setActiveTooltip(jobId);
    }
    onStatusClick?.(jobId, currentStatus);
  };

  const updateStatus = async (e: React.MouseEvent, jobId: string, newStatus: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Update UI immediately
    setJobList(prev =>
      prev.map(job =>
        job._id === jobId ? { ...job, status: newStatus } : job
      )
    );

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }

    setActiveTooltip(null);
    if (onStatusClick) {
      onStatusClick(jobId, newStatus);
    }
  };

  return (
    <div className={`w-full h-full p-6${isGrid ? " grid grid-cols-1 sm:grid-cols-2 gap-6" : ""}`}>
      {Array.isArray(jobList) && jobList.map((job, index) => (
        <Link
          key={job._id}
          href={`/applications/${job._id}`}
          className={`w-full h-[222px] ${index % 2 === 0 ? 'bg-surface' : 'bg-background'}${isGrid ? "" : " mb-6"} rounded-[12px] flex gap-4 px-[35px] py-[28px] hover:cursor-pointer`}
        >
          <img
            src={job.companyLogo || "https://logo.clearbit.com/default.com"}
            className="w-14 h-14 rounded-2xl"
            alt={`${job.company} logo`}
          />
          <div className="flex flex-col">
            <span className="text-[18px] text-[#5895FF] font-semibold max-w-[600px] break-words">
              {isGrid ? (job.title.length > 30 ? `${job.title.slice(0, 30)}...` : job.title) : (job.title.length > 65 ? `${job.title.slice(0, 65)}...` : job.title)}
            </span>
            <span>{job.company}</span>
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="text-[#B2B2B2]" size={18} />
              <span className="text-[14px]">{job.location[0]}</span>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-y-1 gap-x-4 mt-4 text-[14px] max-w-[600px] break-words">
              <div className="flex items-center gap-2">
                <User className="text-[#B2B2B2]" size={18} />
                <span>Full Time</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="text-[#B2B2B2]" size={18} />
                <span>{job.salary.length > 20 ? `${job.salary.slice(0, 20)}...` : job.salary}</span>
              </div>
            </div>
            <div className="hidden xl:flex  gap-2 mt-4 text-[14px] flex-wrap">
              {job.techStack.slice(0, isGrid ? 3 : 4).map((tech, idx) => (
                <span key={idx} className={`px-3 py-1 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-surface'
                } rounded-xl flex items-center gap-2`}>
                  <img
                    src={getTechIconUrl(tech)}
                    alt={tech}
                    className="w-4 h-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/tech-icons/default.svg";
                    }}
                  />
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between ml-auto">
            <div className="relative">
              <button
                onClick={(e) => handleStatusClick(e, job._id, job.status)}
                className="bg-[#CA5C5C]/40 border border-[#E25757] text-white text-sm px-3 py-1 rounded-full mb-2 capitalize"
              >
                {job.status}
              </button>
              <AnimatePresence>
                {activeTooltip === job._id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-background rounded shadow z-50 w-36 text-sm text-text-primary"
                  >
                    <div
                      onClick={(e) => updateStatus(e, job._id, "Applied")}
                      onMouseDown={(e) => e.preventDefault()}
                      className="px-3 py-2 hover:text-primary cursor-pointer"
                    >
                      Applied
                    </div>
                    <div
                      onClick={(e) => updateStatus(e, job._id, "Interviewing")}
                      onMouseDown={(e) => e.preventDefault()}
                      className="px-3 py-2 hover:text-primary cursor-pointer"
                    >
                      Interviewing
                    </div>
                    <div
                      onClick={(e) => updateStatus(e, job._id, "Offered")}
                      onMouseDown={(e) => e.preventDefault()}
                      className="px-3 py-2 hover:text-primary cursor-pointer"
                    >
                      Offered
                    </div>
                    <div
                      onClick={(e) => updateStatus(e, job._id, "Rejected")}
                      onMouseDown={(e) => e.preventDefault()}
                      className="px-3 py-2 hover:text-primary cursor-pointer"
                    >
                      Rejected
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-white text-sm">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
