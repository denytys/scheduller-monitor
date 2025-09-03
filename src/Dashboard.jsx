import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Total from "./components/Total";
import TimelineSection from "./components/Timeline";
import axios from "axios";
import { Modal, Spin } from "antd";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [intervalTime, setIntervalTime] = useState(900000);
  const [lastRefresh, setLastRefresh] = useState(null);
  const intervalRef = useRef(null);

  // 🌙 dark mode state
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MONITOR_BE}/dashboard/stats`
      );
      setStats(res.data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchData, intervalTime);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoRefresh, intervalTime]);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Header
        onRefresh={fetchData}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        intervalTime={intervalTime}
        setIntervalTime={setIntervalTime}
        lastRefresh={lastRefresh}
        darkMode={darkMode} // 🔥 kirim ke Header
        setDarkMode={setDarkMode} // 🔥 kirim ke Header
      />
      <Total stats={stats} darkMode={darkMode} /> {/* 🔥 kirim darkMode */}
      <TimelineSection darkMode={darkMode} /> {/* 🔥 kirim darkMode */}
      <Modal open={loading} footer={null} closable={false} centered>
        <div className="text-center p-4">
          <Spin size="large" />
          <div className="mt-3 font-semibold">Loading . . . </div>
        </div>
      </Modal>
    </div>
  );
}
