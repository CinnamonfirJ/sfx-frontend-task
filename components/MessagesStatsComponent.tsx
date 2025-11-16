"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const MessagesStatsComponent = () => {
  const [activeTab, setActiveTab] = useState("messages");

  const messages = [
    {
      id: 1,
      name: "Peter Japhet",
      initial: "P",
      message: "I need some maintenanc...",
      time: "Jan 2, 12:31pm",
      bgColor: "bg-cyan-400",
    },
    {
      id: 2,
      name: "Leo Arome",
      initial: "L",
      message: "I got your email ad and ...",
      time: "Wed, 06:00pm",
      bgColor: "bg-purple-400",
    },
    {
      id: 3,
      name: "James Robinson",
      initial: "J",
      message: "I need some maintenanc...",
      time: "Jan 2, 12:31pm",
      bgColor: "bg-cyan-400",
    },
    {
      id: 4,
      name: "Lupita Jonah",
      initial: "L",
      message: "Thank you so much for ...",
      time: "Feb 14, 06:15pm",
      bgColor: "bg-amber-400",
    },
    {
      id: 5,
      name: "Sarah Mitchell",
      initial: "S",
      message: "Can we schedule a call...",
      time: "Mar 3, 09:20am",
      bgColor: "bg-rose-400",
    },
    {
      id: 6,
      name: "David Chen",
      initial: "D",
      message: "The project looks great...",
      time: "Mar 5, 02:45pm",
      bgColor: "bg-blue-400",
    },
    {
      id: 7,
      name: "Emily Watson",
      initial: "E",
      message: "I have a question about...",
      time: "Mar 7, 11:30am",
      bgColor: "bg-green-400",
    },
    {
      id: 8,
      name: "Michael Brown",
      initial: "M",
      message: "Thanks for the update...",
      time: "Mar 8, 04:15pm",
      bgColor: "bg-indigo-400",
    },
  ];

  return (
    <div className='top-0 sticky flex justify-center bg-[#F9F9F9] dark:bg-[#1F1F1F] p-6 rounded-tl-[75px] min-h-screen'>
      <div className='w-full max-w-md overflow-hidden'>
        {/* Tab Header */}
        <div className='flex border-gray-200 dark:border-gray-700 border-b'>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "stats"
                ? "text-gray-800 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "messages"
                ? "text-gray-800 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            Messages
          </button>
        </div>

        {/* Messages List */}
        {activeTab === "messages" && (
          <div className='flex flex-col items-center gap-5 py-4 md:h-full max-h-screen overflow-y-auto'>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className='flex flex-col items-center gap-3 bg-white dark:bg-gray-800 shadow-sm dark:shadow-none p-5 rounded-3xl w-full max-w-[300px] cursor-pointer'
              >
                <div className='flex justify-between items-center w-full'>
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 ${msg.bgColor} rounded-2xl flex items-center justify-center shrink-0`}
                  >
                    <span className='font-semibold text-white text-lg'>
                      {msg.initial}
                    </span>
                  </div>

                  <span className='ml-2 text-gray-400 dark:text-gray-500 text-xs'>
                    {msg.time}
                  </span>
                </div>

                {/* Message Content */}
                <div className='flex-1 w-full min-w-0'>
                  <div className='flex justify-between items-center mb-1'>
                    <h3 className='font-semibold text-gray-800 dark:text-gray-100 text-sm truncate'>
                      {msg.name}
                    </h3>
                    {/* Chevron */}
                    <ChevronRight className='w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0' />
                  </div>
                  <p className='text-gray-500 dark:text-gray-400 text-sm truncate'>
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats View */}
        {activeTab === "stats" && (
          <div className='p-8 h-screen text-gray-500 dark:text-gray-400 text-center'>
            <p>No stats available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesStatsComponent;
