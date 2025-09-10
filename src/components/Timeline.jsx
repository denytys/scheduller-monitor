import React from "react";
import {
  Inbox,
  Send,
  Download,
  Upload,
  ShieldCheck,
  Server,
} from "lucide-react";

export default function TimelineSection({ timeline, darkMode }) {
  if (!timeline) {
    return <p className="text-center py-4">Loading timeline...</p>;
  }

  const dataatas = [
    {
      title: "eCert In",
      icon: <Inbox size={12} />,
      color: "bg-purple-500",
      logs: timeline.eCertIn ?? [],
    },
    {
      title: "eCert Out",
      icon: <Send size={12} />,
      color: "bg-green-500",
      logs: timeline.eCertOut ?? [],
    },
  ];

  const databawah = [
    {
      title: "ePhyto In",
      icon: <Download size={12} />,
      color: "bg-yellow-500",
      logs: timeline.ePhytoIn ?? [],
    },
    {
      title: "ePhyto Out",
      icon: <Upload size={12} />,
      color: "bg-blue-500",
      logs: timeline.ePhytoOut ?? [],
    },
  ];

  const passQ = {
    title: "PassQ",
    icon: <ShieldCheck size={12} />,
    color: "bg-yellow-500",
    logs: timeline.passQ ?? [],
  };

  const telnetLogs = {
    title: "Telnet",
    icon: <Server size={12} />,
    color: "bg-red-500",
    logs: timeline.telnetLogs ?? [],
  };

  return (
    <div className="mx-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Kiri */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Baris atas */}
          <div className="flex flex-col md:flex-row gap-4">
            {dataatas.map((item, idx) => (
              <TimelineCard key={idx} item={item} darkMode={darkMode} />
            ))}
          </div>

          {/* Baris bawah */}
          <div className="flex flex-col md:flex-row gap-4">
            {databawah.map((item, idx) => (
              <TimelineCard key={idx} item={item} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Kanan */}
        <div className="flex-1 md:max-w-sm flex flex-col gap-4">
          <TimelineCard item={passQ} fullHeight darkMode={darkMode} />
          <TimelineCard item={telnetLogs} fullHeight darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

// ---- TimelineCard ----
function TimelineCard({ item, fullHeight, darkMode }) {
  const extractDate = (log) => {
    const text = typeof log === "string" ? log : Object.values(log).join(" | ");
    const parts = text.split(" | ");
    const raw = parts.pop()?.trim();

    if (!raw) return null;
    const d = new Date(raw.replace(" ", "T"));
    if (isNaN(d)) return null;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  let status = 0;
  if (item.logs.length > 1) {
    const lastDate = extractDate(item.logs[0]);
    const prevDate = extractDate(item.logs[1]);
    if (lastDate && prevDate && lastDate !== prevDate) {
      status = 1;
    }
  }

  return (
    <div
      className={`p-4 rounded-3xl shadow-md w-full transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } ${fullHeight ? "self-stretch" : ""}`}
    >
      {/* Header */}
      <div
        className={`p-2 rounded-2xl flex items-center justify-between mb-3 ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`${item.color} text-white p-1 rounded-full`}>
            {item.icon}
          </div>
          <h3 className="font-semibold">{item.title} Timeline</h3>
        </div>
        {status === 1 && (
          <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></span>
        )}
      </div>

      {/* Isi log */}
      <div
        className={`p-2 rounded-xl space-y-2 ${
          darkMode ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        {item.logs.map((log, i) => {
          // log telnet (object)
          if (log.status && log.created_at) {
            return (
              <div key={i} className="flex items-start gap-2">
                <span
                  className={`w-2 h-2 mt-1 rounded-full ${
                    i === 0 ? "bg-green-500 animate-ping" : "bg-gray-500"
                  }`}
                ></span>
                <p className="text-xs">
                  <span
                    className={`font-medium ${
                      log.status === "SUCCESS"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {log.status}
                  </span>{" "}
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-500"}
                  >
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </p>
              </div>
            );
          }

          // fallback log string / object biasa
          const text =
            typeof log === "string" ? log : Object.values(log).join(" | ");
          const parts = text.split(" | ");
          const datePart = parts.pop();
          const infoPart = parts.join(" | ");

          return (
            <div key={i} className="flex items-start gap-2">
              <span className="w-2 h-2 mt-1 bg-blue-500 rounded-full"></span>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {infoPart}{" "}
                <span
                  className={`px-2 py-0.5 rounded-md ${
                    i === 0
                      ? "bg-gray-500 text-white"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {datePart}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
