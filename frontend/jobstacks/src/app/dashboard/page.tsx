"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Sidebar from "@/components/Sidebar/Sidebar";
import ApplicationsView from "../Tabs/ApplicationsView";
import SavedJobsView from "../Tabs/SavedJobsView";
import SettingsView from "../Tabs/SettingsView";
import DashboardView from "../Tabs/DashboardView";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:4000/api/users/me", {
          withCredentials: true,
        });
      } catch (error) {
        router.push("/login"); // ⛔️ Not authenticated
      }
    };

    checkAuth();
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case "Applications":
        return <ApplicationsView />;
      case "Saved Jobs":
        return <SavedJobsView />;
      case "Settings":
        return <SettingsView />;
      case "Dashboard":
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      <Sidebar onTabSelect={setActiveTab} />
      <section className="w-full">{renderContent()}</section>
    </div>
  );
}