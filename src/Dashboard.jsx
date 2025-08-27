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

  const fetchData = async () => {
    setLoading(true);

    const start = Date.now();
    const minDuration = 1000;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_MONITOR_BE}/dashboard/stats`
      );
      setStats(res.data);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      const elapsed = Date.now() - start;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
        setTimeout(() => {
          setLoading(false);
        }, remaining);
      } else {
        setLoading(false);
      }
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
    <div className="w-full min-h-screen bg-gray-100">
      <Header
        onRefresh={fetchData}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        intervalTime={intervalTime}
        setIntervalTime={setIntervalTime}
        lastRefresh={lastRefresh}
      />
      <Total stats={stats} />
      <TimelineSection />

      <Modal open={loading} footer={null} closable={false} centered>
        <div className="text-center p-4">
          <Spin size="large" />
          <div className="mt-3 font-semibold">Loading . . . </div>
        </div>
      </Modal>
    </div>
  );
}
