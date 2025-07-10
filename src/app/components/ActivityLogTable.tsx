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
      <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--heading)' }}>Activity Log</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded shadow text-sm" style={{ background: 'var(--card-bg)' }}>
          <thead>
            <tr style={{ background: 'var(--table-header-bg)', color: 'var(--table-header-text)' }}>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Action</th>
              <th className="py-2 px-4">Teacher</th>
              <th className="py-2 px-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-4" style={{ color: 'var(--muted)' }}>No activity yet.</td></tr>
            ) : (
              activityLog.map((log, idx) => (
                <tr key={idx} style={{ borderTop: '1px solid var(--card-border)' }}>
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
