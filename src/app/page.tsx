"use client";
import React, { useState, useEffect } from "react";
import TeacherCard from "./components/TeacherCard";
import { Teacher } from "./types/types";
import { loadTeachers } from "./components/TeacherManager";
import ActivityLogTable from "./components/ActivityLogTable";
import TeacherTable from "./components/TeacherTable";
import TeacherForm from "./components/TeacherForm";

function logActivity(action: string, teacherName?: string, details?: string) {
  if (typeof window === "undefined") return;
  const log = JSON.parse(localStorage.getItem("activityLog") || "[]");
  log.unshift({
    timestamp: new Date().toLocaleString(),
    action,
    teacherName,
    details,
  });
  localStorage.setItem("activityLog", JSON.stringify(log));
  window.dispatchEvent(new Event("storage")); // Force update for listeners
}

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>(loadTeachers());
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    setTeachers(loadTeachers());
    const sync = () => setTeachers(loadTeachers());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
  };

  const handleDelete = (id: string) => {
    const teacher = teachers.find((t) => t.id === id);
    const updated = teachers.filter((t) => t.id !== id);
    localStorage.setItem("teachers", JSON.stringify(updated));
    setTeachers(updated);
    logActivity("Deleted", teacher?.name, "Teacher deleted");
  };

  const handleFormSubmit = (data: Teacher) => {
    let updated: Teacher[];
    if (editingTeacher) {
      updated = teachers.map((t) =>
        t.id === editingTeacher.id ? { ...data, id: editingTeacher.id } : t
      );
      logActivity("Edited", data.name, "Teacher details edited");
    } else {
      updated = [...teachers, data];
      logActivity("Added", data.name, "Teacher added");
    }
    localStorage.setItem("teachers", JSON.stringify(updated));
    setTeachers(updated);
    setEditingTeacher(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Teachers</h2>
      {editingTeacher && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold mb-2">Edit Teacher</h3>
          <TeacherForm
            initialData={editingTeacher}
            onSubmit={handleFormSubmit}
          />
          <button
            className="mt-2 text-sm text-gray-500 hover:underline"
            onClick={() => setEditingTeacher(null)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
