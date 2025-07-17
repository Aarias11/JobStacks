'use client'



import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, description, color = "text-primary" }) => {
  return (
    <div className="bg-surface p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
    </div>
  );
};

export default StatCard;