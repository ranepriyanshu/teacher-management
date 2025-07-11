import Link from 'next/link';
import { Teacher } from '../types/teacher';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Button from './shared/Button';

type Props = {
  teacher: Teacher;
  onDelete: () => void;
};

export default function TeacherCard({ teacher, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between transition hover:shadow-md">
      {/* Left Section - Avatar + Info */}
      <div className="flex items-start md:items-center gap-4 flex-1">
        <img
          src={teacher.avatar || '/avatar-placeholder.png'}
          alt={teacher.name}
          className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{teacher.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.email}</p>
          <p className="text-sm">{teacher.phone}</p>
        </div>
      </div>

      {/* Right Section - Buttons */}
      <div className="mt-3 md:mt-0 flex gap-2 items-center">
        <Link href={`/teachers/${teacher.id}`}>
          <Button size="sm" variant="primary">View</Button>
        </Link>
        <Link href={`/teachers/${teacher.id}/edit`}>
          <button className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            <PencilIcon className="w-5 h-5" />
          </button>
        </Link>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
