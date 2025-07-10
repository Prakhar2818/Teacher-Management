'use client';
import React, { useEffect, useState } from "react";

export interface ActivityLog {
  timestamp: string;
  action: string;
  teacherName?: string;
  details?: string;
}

function loadActivityLog(): ActivityLog[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("activityLog");
  return data ? JSON.parse(data) : [];
}

const ActivityLogTable: React.FC = () => {
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  useEffect(() => {
    setActivityLog(loadActivityLog());
    const sync = () => setActivityLog(loadActivityLog());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Activity Log</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Action</th>
              <th className="py-2 px-4">Teacher</th>
              <th className="py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-4 text-gray-400">No activity yet.</td></tr>
            ) : (
              activityLog.map((log, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2 px-4">{log.action}</td>
                  <td className="py-2 px-4">{log.teacherName || "-"}</td>
                  <td className="py-2 px-4">{log.details || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogTable;
