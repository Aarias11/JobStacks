import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import React from "react";
import {
  Search,
  Plus
} from "lucide-react";

export default function DashboardView() {
  return (
    <div className="w-full flex h-full ">
      <section className="w-[800px] overflow-y-auto  h-screen">
        <div className="h-[75px]  sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">Dashboard</h3>
        </div>
        {/* Content */}
            {/* Search and Add Application Button */}
        <div className="w-full p-6 flex gap-4">
        <div className="relative">
            <Input className="bg-surface pl-14 text-[16px] h-[53px]"
            placeholder="Search by company, title, or tag..."
            />
        <Search className="absolute top-4 left-4" size={20} />
        </div>
        <Button className="h-[53px] flex gap-4">
            <Plus />
            Add Application
        </Button>
        </div>
        {/* Filter */}
        <div className="w-full h-[100px] p-6">
            <ul className="flex justify-between items-center ">
                <li className="px-3 py-2 bg-primary rounded-full">All Applications</li>
                <li>Role Type</li>
                <li>Location</li>
                <li>Tag</li>
                <li>Salary</li>
                <li>Status</li>
                <li>Date</li>
            </ul>
        </div>
        {/* Application Cards Container */}
        <div className="w-full h-full  p-6 mt-4">
            {/* Application Cards */}
            <div className="w-full h-[222px] bg-surface rounded-[12px] flex gap-4 px-[35px] py-[28px]">
                <img src='https://logo.clearbit.com/paypal.com' className="w-14 h-14 rounded-2xl" />
                <div className="flex flex-col">
                    <span className="text-[18px] text-[#5895FF] font-semibold">Backend Software Engineer</span>
                    <span>Paypal</span>
                </div>
            </div>
        </div>
      </section>
      <section className="border-l border-[#272727] w-[400px] overflow-y-auto h-screen">
        <div className="h-auto sticky top-0 bg-background z-10">
          <h3 className="text-[28px] font-semibold p-6">
            Companies You've Applied To
          </h3>
        </div>
      </section>
    </div>
  );
}
