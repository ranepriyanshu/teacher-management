import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import withAuth from '../../../hoc/withAuth';
import Header from '../../../components/shared/Header';
import TeacherForm from '../../../components/TeacherForm';
import { useTeacher } from '../../../context/TeacherContext';
import { Teacher } from '../../../types/teacher';
import toast from 'react-hot-toast';

function EditTeacherPage() {
  const router = useRouter();
  const { id } = router.query;

  const { getTeacher, updateTeacher } = useTeacher();
  const [teacher, setTeacher] = useState<Teacher | undefined>();

  useEffect(() => {
    if (typeof id === 'string') {
      setTeacher(getTeacher(id));
    }
  }, [id, getTeacher]);

  if (!teacher) {
    return (
      <div className="p-6">
        <Header />
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white transition-all">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Edit Teacher</h1>

      <TeacherForm
        initial={teacher}
        onSubmit={(updated) => {
          updateTeacher(updated.id, updated);
          toast.success('Teacher updated successfully');
          router.push(`/teachers/${updated.id}`);
        }}
      />
    </div>
  );
}

export default withAuth(EditTeacherPage);
