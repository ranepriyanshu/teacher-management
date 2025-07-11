import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import withAuth from '../../hoc/withAuth';
import Header from '../../components/shared/Header';
import QualificationsTable from '../../components/QualificationsTable';
import ScheduleGrid from '../../components/ScheduleGrid';
import Button from '../../components/shared/Button';
import { useTeacher } from '../../context/TeacherContext';
import { Teacher, Qualification } from '../../types/teacher';
import toast from 'react-hot-toast';
import Link from 'next/link';

function TeacherProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    getTeacher,
    addQualificationToTeacher,
    updateQualificationOfTeacher,
    deleteQualificationOfTeacher,
    toggleAvailability,
  } = useTeacher();

  const [teacher, setTeacher] = useState<Teacher | undefined>();

  // Load teacher when router is ready
  useEffect(() => {
    if (typeof id === 'string') {
      const t = getTeacher(id);
      setTeacher(t);
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

      {/* Profile Top Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <img
          src={teacher.avatar || '/avatar-placeholder.png'}
          alt="avatar"
          className="h-28 w-28 rounded-full object-cover shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{teacher.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.email}</p>
          <p className="text-sm">{teacher.phone}</p>
          <p className="text-sm">{teacher.address}</p>
          <p className="text-sm">DOB: {teacher.dob}</p>
        </div>

        <Link href={`/teachers/${teacher.id}/edit`}>
          <Button variant="secondary">Edit Profile</Button>
        </Link>
      </div>

      {/* Qualifications */}
      <QualificationsTable
        title="Qualifications"
        data={teacher.qualifications}
        onAdd={(q: Qualification) => {
          addQualificationToTeacher(teacher.id, q);
          toast.success('Qualification added');
        }}
        onUpdate={(index, q) => {
          const qid = teacher.qualifications[index].id;
          updateQualificationOfTeacher(teacher.id, qid, q);
          toast.success('Qualification updated');
        }}
        onDelete={(index) => {
          const qid = teacher.qualifications[index].id;
          deleteQualificationOfTeacher(teacher.id, qid);
          toast.success('Qualification deleted');
        }}
      />

      {/* Availability / Schedule */}
      <div className="mt-8">
        <ScheduleGrid
          availability={teacher.availability}
          onToggle={(slotKey) => {
            toggleAvailability(teacher.id, slotKey);
          }}
        />
      </div>
    </div>
  );
}

export default withAuth(TeacherProfilePage);
