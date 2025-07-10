import { Teacher } from "../types/types";

interface Props {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

export default function TeacherCard({ teacher, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 shadow rounded-lg space-y-2">
      <h3 className="text-lg font-bold" style={{ color: 'var(--heading)' }}>{teacher.name}</h3>
      <p style={{ color: 'var(--foreground)' }}>{teacher.email}</p>
      <p style={{ color: 'var(--foreground)' }}>{teacher.subject}</p>
      <p style={{ color: 'var(--foreground)' }}>{teacher.experience} years experience</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(teacher)} className="px-3 py-1 rounded" style={{ background: 'var(--primary)', color: '#fff' }}>Edit</button>
        <button onClick={() => onDelete(teacher.id)} className="px-3 py-1 rounded" style={{ background: 'var(--danger)', color: '#fff' }}>Delete</button>
      </div>
    </div>
  );
}
