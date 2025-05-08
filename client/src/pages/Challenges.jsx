import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Challenges() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const showAddButton = !!token;

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get('/challenges');
        setChallenges(res.data);
      } catch (err) {
        console.error('❌ فشل جلب التحديات:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading)
    return <p className="text-center text-white mt-8">جاري التحميل...</p>;
  return (
    <div className="max-w-4xl mx-auto mt-10">
      {showAddButton && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/add')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            ➕ إضافة تحدٍ جديد
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-white mb-6">
        📚 قائمة التحديات
      </h2>

      {challenges.length === 0 ? (
        <p className="text-center text-gray-300">لا توجد تحديات بعد.</p>
      ) : (
        <div className="space-y-6">
          {challenges.map((challenge) => (
            <Link
              to={`/challenges/${challenge.id}`}
              key={challenge.id}
              className="block bg-white/5 border border-white/10 p-6 rounded-lg shadow-md hover:shadow-xl transition hover:bg-white/10"
            >
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                {challenge.title}
              </h3>
              <p className="text-gray-200 mb-4">{challenge.description}</p>
              <div className="text-sm text-gray-400">
                📅 من{' '}
                <span className="font-medium text-white">
                  {new Date(challenge.start_date).toLocaleDateString()}
                </span>{' '}
                إلى{' '}
                <span className="font-medium text-white">
                  {new Date(challenge.end_date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Challenges;
