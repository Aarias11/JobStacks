import React from 'react';
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
};

export default function JobCards({ jobs }: JobCardsProps) {
  function getTechIconUrl(name: string) {
    const normalized = name
      .toLowerCase()
      .replace(/\+/g, "plus")
      .replace(/#/g, "sharp")
      .replace(/\s+/g, "");
    return `/tech-icons/${normalized}.svg`;
  }

  return (
    <div className="w-full h-full p-6">
      {jobs.map((job, index) => (
        <div
          key={job._id}
          className={`w-full h-[222px] ${
            index % 2 === 0 ? 'bg-surface' : 'bg-background'
          } rounded-[12px] flex gap-4 px-[35px] py-[28px] mb-6`}
        >
          <img
            src={job.companyLogo || "https://logo.clearbit.com/default.com"}
            className="w-14 h-14 rounded-2xl"
            alt={`${job.company} logo`}
          />
          <div className="flex flex-col">
            <span className="text-[18px] text-[#5895FF] font-semibold">
              {job.title}
            </span>
            <span>{job.company}</span>
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="text-[#B2B2B2]" size={18} />
              <span className="text-[14px]">{job.location.join(", ")}</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2">
                <User className="text-[#B2B2B2]" size={18} />
                <span className="text-[14px]">Full Time</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="text-[#B2B2B2]" size={18} />
                <span className="text-[14px]">{job.salary}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 text-[14px] flex-wrap">
              {job.techStack.slice(0, 4).map((tech, idx) => (
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
        </div>
      ))}
    </div>
  );
}
