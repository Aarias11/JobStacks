"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, User, BadgeDollarSign, Code } from "lucide-react";

function InfoBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 bg-surface p-5 rounded-xl shadow-sm">
      <div className="p-2 rounded-full bg-background text-white">{icon}</div>
      <div>
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenFromCookie = () => {
      const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const token = getTokenFromCookie();
    async function fetchJob() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchJob();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!job) return <p className="p-8">Job not found</p>;

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 pb-2">
        <div className="flex items-center gap-6">
          <img
            src={job.companyLogo || "https://logo.clearbit.com/default.com"}
            alt={`${job.company} logo`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-white/10 bg-white object-contain shadow"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{job.title}</h1>
            <div className="flex gap-3 text-sm text-text-secondary mt-2 items-center">
              <span>{job.company}</span>
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <span className="px-4 py-1 text-sm rounded-full border border-red-500 bg-red-500/10 text-white mt-4 sm:mt-0">
          {job.status}
        </span>
      </header>

      {/* All Job Details */}
      <div className="space-y-10">
        {/* Info Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoBlock icon={<MapPin size={22} />} label="Location" value={job.location} />
            <InfoBlock icon={<User size={22} />} label="Position" value="Full Time" />
            <InfoBlock icon={<BadgeDollarSign size={22} />} label="Salary" value={job.salary} />
          </div>
        </section>

        {/* Description */}
        {job.description && (
          <section className="border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
            <p className="text-text-secondary whitespace-pre-line">{job.description}</p>
          </section>
        )}

        {/* Tech Stack */}
        <section className="border-t border-white/10 pt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Code size={20} /> Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(job.techStack) &&
              job.techStack.map((tech: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-surface px-4 py-2 rounded-md min-w-[120px] shadow-sm"
                >
                  <img
                    src={`/tech-icons/${tech.toLowerCase().replace(/\s+/g, "")}.svg`}
                    alt={tech}
                    className="w-5 h-5"
                    onError={(e) => {
                      e.currentTarget.src = "/tech-icons/default.svg";
                    }}
                  />
                  <span className="text-sm text-white">{tech}</span>
                </div>
              ))}
          </div>
        </section>

        {/* Tags */}
        {Array.isArray(job.tags) && job.tags.length > 0 && (
          <section className="border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-surface text-white text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Responsibilities */}
        {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
          <section className="border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Responsibilities</h2>
            <ul className="text-text-secondary list-disc pl-6 space-y-2 ">
              {job.responsibilities.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Requirements */}
        {Array.isArray(job.requirements) && job.requirements.length > 0 && (
          <section className="border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
            <ul className="text-text-secondary list-disc pl-6 space-y-2">
              {job.requirements.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Source Link */}
        {job.sourceUrl && (
          <section className="border-t border-white/10 pt-10">
            <Link
              href={job.sourceUrl}
              target="_blank"
              className="inline-block text-sm text-blue-400 hover:underline"
            >
              View original job posting ↗
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
