import React, { useState } from "react";
import { Tag, Switch } from "antd";
import {
  CaretLeftOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Header({
  onRefresh,
  intervalTime,
  setIntervalTime,
  lastRefresh,
  darkMode, // ✅ dari Dashboard
  setDarkMode, // ✅ dari Dashboard
}) {
  const [open, setOpen] = useState(false);
  const [openInterval, setOpenInterval] = useState(false);

  const items = [
    { key: 900000, label: "15 menit" },
    { key: 1800000, label: "30 menit" },
  ];

  const formatTime = (date) =>
    date
      ? date.toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "-";

  return (
    <div
      className={`w-full rounded-b-2xl shadow-md px-6 py-8 flex items-center justify-between mb-5 relative transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <p className="text-xl font-bold">Dashboard Monitoring Scheduller</p>
      <Tag color={darkMode ? "geekblue" : "blue"}>
        Last Refresh: {formatTime(lastRefresh)}
      </Tag>

      <div className="absolute top-24 md:top-20 right-3 flex items-center gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* tombol refresh */}
              <button
                onClick={onRefresh}
                className={`w-8 h-8 rounded-full shadow flex items-center justify-center leading-none transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                    : "bg-white text-blue-500 hover:bg-gray-100"
                }`}
              >
                <ReloadOutlined className="text-sm" />
              </button>

              {/* interval */}
              <div
                className={`w-8 h-8 rounded-full shadow flex items-center justify-center relative transition-colors duration-300 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenInterval(!openInterval)}
                  className="w-full h-full flex items-center justify-center rounded-full focus:outline-none"
                >
                  <ClockCircleOutlined
                    className={darkMode ? "text-white" : "text-black"}
                  />
                </button>

                <AnimatePresence>
                  {openInterval && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-2 right-0 w-28 shadow rounded-lg z-50 transition-colors duration-300 ${
                        darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {items.map((item) => (
                        <p
                          key={item.key}
                          onClick={() => {
                            setIntervalTime(Number(item.key));
                            setOpenInterval(false);
                          }}
                          className={`px-3 py-1 cursor-pointer transition-colors ${
                            darkMode ? "hover:bg-gray-700" : "hover:bg-blue-100"
                          }`}
                        >
                          {item.label}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 🌙 switch dark mode */}
              <div
                className={`px-1 pt-0 pb-1 rounded-full shadow transition-colors duration-300 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  checkedChildren={
                    <div className="flex items-center justify-center">
                      <Moon size={14} className="text-white mt-1" />
                    </div>
                  }
                  unCheckedChildren={
                    <div className="flex items-center justify-center">
                      <Sun size={14} className="text-white mt-1" />
                    </div>
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* toggle panel */}
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full !bg-blue-500 !text-white shadow flex items-center justify-center leading-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <CaretLeftOutlined rotate={open ? 180 : 0} />
        </button>
      </div>
    </div>
  );
}
