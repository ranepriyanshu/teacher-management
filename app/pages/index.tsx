import { useTeacher } from '../context/TeacherContext';
import { useRouter } from 'next/router';
import Button from '../components/shared/Button';
import withAuth from '../hoc/withAuth';
import Header from '../components/shared/Header';
function HomePage() {
  const { teachers, deleteTeacher } = useTeacher();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.email.toLowerCase().includes(query.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header />

      <div className="flex justify-between items-center mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teachers..."
          className="px-4 py-2 border rounded dark:bg-gray-700"
        />
        <Link href="/teachers/new">
          <Button>Add Teacher</Button>
        </Link>
      </div>

      {paginated.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          onDelete={() => {
            deleteTeacher(teacher.id);
            toast.success('Teacher deleted');
          }}
        />
      ))}

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(HomePage);