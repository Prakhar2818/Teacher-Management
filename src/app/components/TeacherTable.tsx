'use client'
import React, { useEffect, useState } from "react";
import { Teacher } from "../types/types";

function loadTeachers(): Teacher[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("teachers");
  return data ? JSON.parse(data) : [];
}

const TeacherTable: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    setTeachers(loadTeachers());
    const sync = () => setTeachers(loadTeachers());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">All Teachers</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Subject</th>
              <th className="py-2 px-4">Experience</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4 text-gray-400">No teachers found.</td></tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="border-t">
                  <td className="py-2 px-4 whitespace-nowrap">{teacher.id}</td>
                  <td className="py-2 px-4">{teacher.name}</td>
                  <td className="py-2 px-4">{teacher.email}</td>
                  <td className="py-2 px-4">{teacher.subject}</td>
                  <td className="py-2 px-4">{teacher.experience}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;
