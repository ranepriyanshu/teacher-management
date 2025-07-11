import { useRouter } from 'next/router';
import TeacherForm from '../../components/TeacherForm';
import { useTeacher } from '../../context/TeacherContext';

import withAuth from '../../hoc/withAuth';
import Header from '../../components/shared/Header';
import toast from 'react-hot-toast';


function NewTeacherPage() {
  const { addTeacher } = useTeacher();
  const router = useRouter();

  return (
    <div className="p-6">
      <Header />
      <TeacherForm
        onSubmit={(teacher) => {
          addTeacher(teacher);
          toast.success('Teacher added!');
          router.push('/');
        }}
      />
    </div>
  );
}

export default withAuth(NewTeacherPage);
