import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await api.get(`/challenges/${id}`);
        setChallenge(res.data);
      } catch (err) {
        toast.error('فشل في تحميل التحدي');
        navigate('/challenges');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = confirm('هل أنت متأكد من حذف هذا التحدي؟');
    if (!confirmDelete) return;

    try {
      await api.delete(`/challenges/${id}`);
      toast.success('✅ تم حذف التحدي بنجاح');
      navigate('/challenges');
    } catch (err) {
      console.error('❌ فشل الحذف:', err);
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">⏳ جارٍ التحميل...</p>;

  if (!challenge) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white/5 p-6 rounded-lg shadow-lg text-white">
      <Link
        to="/challenges"
        className="text-sm text-purple-300 hover:underline block mb-4"
      >
        ← الرجوع للتحديات
      </Link>

      <h2 className="text-3xl font-bold text-cyan-300 mb-2">
        {challenge.title}
      </h2>

      <p className="text-gray-300 mb-4">{challenge.description}</p>

      <div className="text-sm text-gray-400 mb-6">
        من{' '}
        <span className="text-white font-medium">
          {new Date(challenge.start_date).toLocaleDateString()}
        </span>{' '}
        إلى{' '}
        <span className="text-white font-medium">
          {new Date(challenge.end_date).toLocaleDateString()}
        </span>
      </div>

      {user?.id === challenge.creator_id && (
        <div className="flex gap-4">
          <Link
            to={`/challenges/${challenge.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ✏️ تعديل
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🗑️ حذف
          </button>
        </div>
      )}
    </div>
  );
}

export default ChallengeDetails;
