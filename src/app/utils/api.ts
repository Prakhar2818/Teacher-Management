import { Teacher } from "../types/types";

let teachers: Teacher[] = [];

export const getTeachers = async (): Promise<Teacher[]> => {
  return teachers;
};

export const addTeacher = async (teacher: Teacher) => {
  teachers.push(teacher);
};

export const updateTeacher = async (teacher: Teacher) => {
  teachers = teachers.map(t => (t.id === teacher.id ? teacher : t));
};

export const deleteTeacher = async (id: string) => {
  teachers = teachers.filter(t => t.id !== id);
};
