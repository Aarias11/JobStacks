"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import ApplicationsView from "../Tabs/ApplicationsView";
import SavedJobsView from "../Tabs/SavedJobsView";
import SettingsView from "../Tabs/SettingsView";
import DashboardView from "../Tabs/DashboardView";



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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
      {/* Sidebar */}
      <Sidebar onTabSelect={setActiveTab} />

      {/* Dashboard Content */}
      <section className="w-full  ">{renderContent()}</section>

      
    </div>
  );
}