'use client';
import React from "react";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  File,
  Bookmark,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";

type Tab = {
  label: string;
  icon: LucideIcon;
};

type SidebarProps = {
  onTabSelect: (label: string) => void;
};

export default function Sidebar({ onTabSelect }: SidebarProps) {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.name, email: data.email });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);
  const mainTabs: Tab[] = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Applications", icon: File },
    // { label: "Saved Jobs", icon: Bookmark },
  ];

  const bottomTabs: Tab[] = [
    { label: "Settings", icon: Settings },
    { label: "Logout", icon: LogOut },
  ];

  return (
    <section className="border border-[#272727] lg:block hidden py-2 px-4 h-full sticky top-0 left-0">
      {/* Logo */}
      <img
        src="/jobstacks_logo.svg"
        alt="JobStacks Logo"
        width={160}
        height={40}
      />

      <div className="flex flex-col h-[85%] mt-8">
        <ul className="flex flex-col gap-2">
          {mainTabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => onTabSelect(tab.label)}
              className="flex gap-2 items-center hover:bg-surface p-2 hover:rounded-[10px] hover:cursor-pointer"
            >
              <tab.icon size={18} />
              {tab.label}
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-6 mt-auto mb-6">
          {bottomTabs.map((tab, index) => (
            <li
              key={index}
              onClick={async () => {
                if (tab.label === "Logout") {
                  await fetch("/api/logout", {
                    method: "POST",
                    credentials: "include",
                  });
                  window.location.href = "/login";
                } else {
                  onTabSelect(tab.label);
                }
              }}
              className="flex gap-2 items-center hover:bg-surface p-2 hover:rounded-[10px] hover:cursor-pointer"
            >
              <tab.icon size={18} />
              {tab.label}
            </li>
          ))}
        </ul>

        {/* Profile */}
        <div className="flex gap-3 border-t border-[#272727] pt-4 ">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
            {user.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?"}
          </div>
          <div>
            <span className="text-[16px] text-text-primary flex">{user.name || "Loading..."}</span>
            <span className="text-[14px] text-text-secondary">
              {user.email || "Fetching user..."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}