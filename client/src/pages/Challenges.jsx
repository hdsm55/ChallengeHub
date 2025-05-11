import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';

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
        console.error('❌ فشل جلب التحديات:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading)
    return <p className="text-center text-white mt-8">جاري التحميل...</p>;

  return (
    <div className="space-y-6">
      {showAddButton && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/add')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            ➕ إضافة تحدٍ جديد
          </button>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        <span role="img" aria-label="books">
          📚
        </span>{' '}
        قائمة التحديات
      </h2>

      {challenges.length === 0 ? (
        <p className="text-center text-gray-300">لا توجد تحديات بعد.</p>
      ) : (
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Challenges;
