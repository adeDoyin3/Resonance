import React, { useState } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  timePeriods?: string[];
  onTimePeriodChange?: (period: string) => void;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle = "YOUR LISTENING",
  timePeriods = ["4 WEEKS", "6 MONTHS", "12 MONTHS"],
  onTimePeriodChange,
}) => {
  const [activeTab, setActiveTab] = useState(timePeriods[0]);

  const handleTabClick = (period: string) => {
    setActiveTab(period);
    onTimePeriodChange?.(period);
  };

  return (
    <div className="bg-black px-8 py-12">
      <div className="flex items-end justify-between gap-8">
        <div className="flex-1">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            {subtitle}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">{title}</h1>
        </div>

        {timePeriods.length > 0 && (
          <div className="flex gap-3 items-center">
            {timePeriods.map((period) => (
              <button
                key={period}
                onClick={() => handleTabClick(period)}
                className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition ${
                  activeTab === period
                    ? "bg-white text-black"
                    : "bg-transparent text-gray-400 border border-gray-600 hover:border-gray-400 hover:text-gray-300"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
