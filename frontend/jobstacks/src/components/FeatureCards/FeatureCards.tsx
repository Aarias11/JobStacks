import React from "react";
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-medium text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;