import React, { useEffect, useState } from "react";
import { Inbox, Send, Download, Upload, ShieldCheck } from "lucide-react";
import axios from "axios";

export default function Total() {
  const [statsData, setStatsData] = useState({});

  // Fetch total stats
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MONITOR_BE}/dashboard/stats`)
      .then((res) => setStatsData(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const stats = [
    {
      title: "Ecert In",
      value: statsData.ecert_in || 0,
      icon: <Inbox size={20} />,
      color: "bg-purple-500",
    },
    {
      title: "Ephyto In",
      value: statsData.ephyto_in || 0,
      icon: <Download size={20} />,
      color: "bg-yellow-500",
    },
    {
      title: "Ecert Out",
      value: statsData.ecert_out || 0,
      icon: <Send size={20} />,
      color: "bg-green-500",
    },
    {
      title: "Ephyto Out",
      value: statsData.ephyto_out || 0,
      icon: <Upload size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "PassQ",
      value: statsData.passq || 0,
      icon: <ShieldCheck size={20} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-3xl shadow-md mb-4 mx-8">
      <h2 className="font-semibold mb-2">
        Total Data {statsData.year ? statsData.year : "Hari Ini"}
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl w-full"
          >
            <div className={`${stat.color} text-white p-3 rounded-full`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">{stat.title}</span>
              <span className="text-xl font-bold">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
