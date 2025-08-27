import React, { useState } from "react";
import { Tag } from "antd";
import {
  CaretLeftOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({
  onRefresh,
  intervalTime,
  setIntervalTime,
  lastRefresh,
}) {
  const [open, setOpen] = useState(false);
  const [openInterval, setOpenInterval] = useState(false);

  const items = [
    { key: 900000, label: "15 menit" },
    { key: 1800000, label: "30 menit" },
  ];

  const formatTime = (date) => {
    if (!date) return "-";
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="w-full bg-white rounded-b-2xl shadow-md px-6 py-4 flex items-center justify-between mb-5 relative">
      <p className="text-xl font-bold">Dashboard Monitoring Scheduller</p>
      <Tag color="blue">Last Refresh: {formatTime(lastRefresh)}</Tag>

      <div className="absolute top-18 md:top-12 right-3 flex items-center gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onRefresh}
                className="w-8 h-8 rounded-full bg-white text-blue-500 shadow flex items-center justify-center leading-none"
              >
                <ReloadOutlined className="text-sm" />
              </button>

              <div className="w-8 h-8 !rounded-full bg-white shadow flex items-center justify-center relative">
                <button
                  onClick={() => setOpenInterval(!openInterval)}
                  className="w-full h-full flex items-center justify-center rounded-full focus:outline-none"
                >
                  <ClockCircleOutlined />
                </button>

                <AnimatePresence>
                  {openInterval && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 w-28 bg-white shadow rounded-lg z-50"
                    >
                      {items.map((item) => (
                        <p
                          key={item.key}
                          onClick={() => {
                            setIntervalTime(Number(item.key));
                            setOpenInterval(false);
                          }}
                          className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
                        >
                          {item.label}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
