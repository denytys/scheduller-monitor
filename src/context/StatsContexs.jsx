// src/context/StatsContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StatsContext = createContext();

export const useStats = () => useContext(StatsContext);

export const StatsProvider = ({ children }) => {
  const [statsData, setStatsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [intervalMs, setIntervalMs] = useState(10000);
  const [time, setTime] = useState(new Date());

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MONITOR_BE}/dashboard/stats`
      );
      setStatsData(res.data ?? {});
      setTime(new Date());
    } catch (err) {
      console.error("Error fetching stats:", err);
      setStatsData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(); // initial
    const interval = setInterval(fetchStats, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <StatsContext.Provider
      value={{
        statsData,
        loading,
        time,
        fetchStats,
        intervalMs,
        setIntervalMs,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};
