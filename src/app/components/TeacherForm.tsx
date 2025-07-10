"use client";

import { useForm } from "react-hook-form";
import { Teacher } from "../types/types";

interface Props {
  initialData?: Teacher;
  onSubmit: (data: Teacher) => void;
}

export default function TeacherForm({ initialData, onSubmit }: Props) {
  const { register, handleSubmit, reset } = useForm<Teacher>({
    defaultValues: initialData || {
      id: "",
      name: "",
      email: "",
      subject: "",
      experience: 0,
    },
  });

  const submit = (data: Teacher) => {
    onSubmit({ ...data, id: initialData?.id || crypto.randomUUID() });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
      <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
      <input {...register("subject")} placeholder="Subject" className="w-full border p-2 rounded" />
      <input type="number" {...register("experience")} placeholder="Experience" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {initialData ? "Update" : "Add"} Teacher
      </button>
    </form>
  );
}
