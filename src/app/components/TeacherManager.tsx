"use client";

import React, { useState } from "react";
import TeacherForm from "../components/TeacherForm";
import { Teacher } from "../types/types";

const TEACHERS_KEY = "teachers";

export function loadTeachers(): Teacher[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TEACHERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTeachers(teachers: Teacher[]) {
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers));
}

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

export default function TeacherManager() {
  const [teachers, setTeachers] = useState<Teacher[]>(loadTeachers());

  const handleAddTeacher = (teacher: Teacher) => {
    const updated = [...teachers, teacher];
    setTeachers(updated);
    saveTeachers(updated);
    logActivity("Added", teacher.name, "Teacher added");
  };

  return (
    <div className="mx-auto mt-8 md-flex">
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
        <TeacherForm onSubmit={handleAddTeacher} />
      </div>
    </div>
  );
}
