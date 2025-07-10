"use client";

import { useRouter } from "next/navigation";
import TeacherForm from "../components/TeacherForm";
import { Teacher } from "../types/types";

const TEACHERS_KEY = "teachers";

function loadTeachers(): Teacher[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TEACHERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTeachers(teachers: Teacher[]) {
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers));
}

export default function AddTeacherPage() {
  const router = useRouter();

  const handleAddTeacher = (teacher: Teacher) => {
    const teachers = loadTeachers();
    saveTeachers([...teachers, teacher]);
    // Log activity
    const log = JSON.parse(localStorage.getItem("activityLog") || "[]");
    log.unshift({
      timestamp: new Date().toLocaleString(),
      action: "Added",
      teacherName: teacher.name,
      details: "Teacher registered",
    });
    localStorage.setItem("activityLog", JSON.stringify(log));
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
      <TeacherForm onSubmit={handleAddTeacher} />
    </div>
  );
}
