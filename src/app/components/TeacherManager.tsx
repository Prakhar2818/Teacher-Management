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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAddTeacher = async (teacher: Teacher) => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      // Simulate async
      await new Promise((res) => setTimeout(res, 500));
      if (
        !teacher.name ||
        !teacher.email ||
        !teacher.subject ||
        !teacher.experience
      ) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }
      const updated = [...teachers, teacher];
      setTeachers(updated);
      saveTeachers(updated);
      logActivity("Added", teacher.name, "Teacher added");
      setSuccess("Teacher added successfully!");
    } catch {
      setError("Failed to add teacher. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 md-flex px-2 sm:px-4">
      <div className="max-w-md w-full mx-auto bg-white rounded shadow p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Teacher</h2>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="mb-2 text-green-600 text-sm">{success}</div>
        )}
        <TeacherForm onSubmit={handleAddTeacher} loading={loading} />
      </div>
    </div>
  );
}
