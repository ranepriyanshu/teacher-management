import { createContext, useContext, useEffect, useState } from 'react';
import { Teacher, Qualification } from '../types/teacher';

type TeacherContextType = {
  teachers: Teacher[];
  getTeacher: (id: string) => Teacher | undefined;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, updated: Teacher) => void;
  deleteTeacher: (id: string) => void;

  addQualificationToTeacher: (teacherId: string, qualification: Qualification) => void;
  updateQualificationOfTeacher: (teacherId: string, qid: string, updated: Qualification) => void;
  deleteQualificationOfTeacher: (teacherId: string, qid: string) => void;

  toggleAvailability: (teacherId: string, slotKey: string) => void;
};

const TeacherContext = createContext<TeacherContextType | null>(null);

const STORAGE_KEY = 'teacher-data';

export const TeacherProvider = ({ children }: { children: React.ReactNode }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTeachers(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
  }, [teachers]);

  const getTeacher = (id: string) => teachers.find((t) => t.id === id);

  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [...prev, teacher]);
  };

  const updateTeacher = (id: string, updated: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const addQualificationToTeacher = (teacherId: string, qualification: Qualification) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? { ...t, qualifications: [...t.qualifications, qualification] }
          : t
      )
    );
  };

  const updateQualificationOfTeacher = (
    teacherId: string,
    qid: string,
    updated: Qualification
  ) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              qualifications: t.qualifications.map((q) =>
                q.id === qid ? updated : q
              ),
            }
          : t
      )
    );
  };

  const deleteQualificationOfTeacher = (teacherId: string, qid: string) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              qualifications: t.qualifications.filter((q) => q.id !== qid),
            }
          : t
      )
    );
  };

  const toggleAvailability = (teacherId: string, slotKey: string) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              availability: {
                ...t.availability,
                [slotKey]: !t.availability?.[slotKey],
              },
            }
          : t
      )
    );
  };

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        getTeacher,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addQualificationToTeacher,
        updateQualificationOfTeacher,
        deleteQualificationOfTeacher,
        toggleAvailability,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
};
