"use client";
import React, { useState, useEffect } from "react";
import TeacherCard from "./components/TeacherCard";
import { Teacher } from "./types/types";
import { loadTeachers } from "./components/TeacherManager";

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    setTeachers(loadTeachers());
    const sync = () => setTeachers(loadTeachers());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleEdit = (teacher: Teacher) => {
    // Implement edit logic or navigation
  };

  const handleDelete = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    localStorage.setItem("teachers", JSON.stringify(updated));
    setTeachers(updated);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Teachers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.length === 0 ? (
          <div className="text-gray-500">No teachers found.</div>
        ) : (
          teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
