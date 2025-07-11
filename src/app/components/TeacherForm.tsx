"use client";

import { useForm } from "react-hook-form";
import { Teacher } from "../types/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: Teacher;
  onSubmit: (data: Teacher) => void;
  loading?: boolean;
}

function CustomLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded shadow flex flex-col items-center">
        <div className="mb-3">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin-custom"></div>
        </div>
        <div className="text-green-700 font-semibold text-lg tracking-wide">
          Processing your request...
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin-custom {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-custom {
          animation: spin-custom 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function TeacherForm({ initialData, onSubmit, loading }: Props) {
  const [showLoader, setShowLoader] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Teacher>({
    defaultValues: initialData || {
      id: "",
      name: "",
      email: "",
      subject: "",
      experience: 0,
    },
  });

  const submit = (data: Teacher) => {
    const teacherId = initialData?.id || crypto.randomUUID();
    onSubmit({ ...data, id: teacherId });
    // Add activity log with unique id
    if (typeof window !== "undefined") {
      const log = {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleString(),
        action: "Teacher Added",
        teacherName: data.name,
        details: `A new teacher Added.`,
      };
      const logs = JSON.parse(localStorage.getItem("activityLog") || "[]");
      logs.unshift(log);
      localStorage.setItem("activityLog", JSON.stringify(logs));
      window.dispatchEvent(new Event("storage"));
    }
    reset();
    setShowToast(true);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      router.push("/");
    }, 10000);
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {showLoader && <CustomLoader />}
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-5 text-base bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto border border-gray-200"
        style={{ boxShadow: '0 4px 24px 0 rgba(34,197,94,0.08)' }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 tracking-tight" style={{ color: 'var(--heading-light)' }}>
          {initialData ? "Edit Teacher" : "Add New Teacher"}
        </h2>
        <div>
          <label className="block font-medium mb-1" style={{ color: 'var(--foreground)' }}>Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          {errors.name && (
            <span className="text-xs text-red-600">Name is required</span>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1" style={{ color: 'var(--foreground)' }}>Email</label>
          <input
            {...register("email", { required: true, pattern: /.+@.+\..+/ })}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          {errors.email && (
            <span className="text-xs text-red-600">Valid email is required</span>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1" style={{ color: 'var(--foreground)' }}>Subject</label>
          <input
            {...register("subject", { required: true })}
            placeholder="Subject"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          {errors.subject && (
            <span className="text-xs text-red-600">Subject is required</span>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1" style={{ color: 'var(--foreground)' }}>Experience (years)</label>
          <input
            type="number"
            {...register("experience", { required: true, min: 1 })}
            placeholder="Experience"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          {errors.experience && (
            <span className="text-xs text-red-600">Experience is required</span>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded w-full font-semibold transition disabled:opacity-60 shadow"
          style={{ background: 'var(--primary)', color: '#fff' }}
          disabled={loading || showLoader}
        >
          {loading ? "Saving..." : initialData ? "Update" : "Add"} Teacher
        </button>
      </form>
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg z-50 text-base animate-fade-in" style={{ background: 'var(--primary)', color: '#fff' }}>
          Form submitted successfully!
        </div>
      )}
    </>
  );
}
