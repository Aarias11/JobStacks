import React from 'react';
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
};

export default function JobCards({ jobs, variant = "default" }: JobCardsProps) {
  const isGrid = variant === "grid";
  function getTechIconUrl(name: string) {
    const normalized = name
      .toLowerCase()
      .replace(/\+/g, "plus")
      .replace(/#/g, "sharp")
      .replace(/\s+/g, "");
    return `/tech-icons/${normalized}.svg`;
  }

  return (
    <div className={`w-full h-full p-6${isGrid ? " grid grid-cols-1 sm:grid-cols-2 gap-6" : ""}`}>
      {Array.isArray(jobs) && jobs.map((job, index) => (
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
            <div className="flex gap-2 mt-4 text-[14px] flex-wrap">
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
            <span className="bg-[#CA5C5C]/40 border border-[#E25757] text-white text-sm px-3 py-1 rounded-full mb-2 capitalize">
              {job.status}
            </span>
            <span className="text-white text-sm">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
