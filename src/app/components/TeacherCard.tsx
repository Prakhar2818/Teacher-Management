import { Teacher } from "../types/types";

interface Props {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

export default function TeacherCard({ teacher, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 shadow rounded-lg space-y-2">
      <h3 className="text-lg font-bold">{teacher.name}</h3>
      <p>{teacher.email}</p>
      <p>{teacher.subject}</p>
      <p>{teacher.experience} years experience</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(teacher)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
        <button onClick={() => onDelete(teacher.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
}
