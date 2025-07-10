'use client'
import React from 'react'
import TeacherForm from '../components/TeacherForm'
import { useRouter } from 'next/navigation'
import { Teacher } from '../types/types'
import { loadTeachers } from '../components/TeacherManager'

const TEACHERS_KEY = "teachers";

function saveTeachers(teachers: Teacher[]) {
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers));
}

const Page = () => {
  const router = useRouter();

  const handleAddTeacher = (teacher: Teacher) => {
    const teachers = loadTeachers();
    saveTeachers([...teachers, teacher]);
    router.push("/"); // Redirect to Home page
  };

  return (
    <TeacherForm onSubmit={handleAddTeacher} />
  )
}

export default Page