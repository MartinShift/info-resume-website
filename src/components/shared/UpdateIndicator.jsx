import React from 'react';

export const UpdateIndicator = () => {
  const updateInfo = {
    date: "March 20, 2025",
    highlights: [
      {
        type: "New",
        text: "Added a blog post about Project Education"
      },
      {
        type: "New",
        text: "Added a visitors indicator that uses Firebase"
      },
      {
        type: "Update",
        text: "Improved website navigation"
      }
    ]
  };

  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-screen-lg px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-400">Latest updates</span>
            <span className="text-gray-500 ml-2">—</span>
            <span className="text-gray-400 ml-2">{updateInfo.date}</span>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          {updateInfo.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                highlight.type === "New" ? "bg-green-500/20 text-green-400" : 
                "bg-blue-500/20 text-blue-400"
              }`}>
                {highlight.type}
              </span>
              <span className=" ml-2 text-sm text-gray-300">{highlight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};