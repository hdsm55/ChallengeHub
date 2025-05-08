import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await api.get(`/challenges/${id}`);
        setChallenge(response.data);
      } catch (err) {
        console.error('❌ فشل جلب التحدي:', err);
        setError('لم يتم العثور على التحدي');
      }
    };

    fetchChallenge();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!challenge)
    return <p className="text-white text-center mt-10">جاري التحميل...</p>;

  const isOwner = user && user.id === challenge.creator_id;

  const handleDelete = async () => {
    if (!token) return;

    const confirmDelete = window.confirm('هل أنت متأكد من حذف التحدي؟');
    if (!confirmDelete) return;

    try {
      await api.delete(`/challenges/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ تم حذف التحدي بنجاح');
      navigate('/challenges');
    } catch (err) {
      console.error('❌ فشل حذف التحدي:', err);
      alert('حدث خطأ أثناء حذف التحدي');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/5 text-white rounded-xl shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded text-white font-medium transition"
      >
        ⬅ الرجوع للتحديات
      </button>

      <h2 className="text-3xl font-bold mb-4 text-cyan-300">
        {challenge.title}
      </h2>
      <p className="text-gray-200 mb-4">{challenge.description}</p>
      <p className="text-sm text-gray-400">
        📅 {new Date(challenge.start_date).toLocaleDateString()} →{' '}
        {new Date(challenge.end_date).toLocaleDateString()}
      </p>

      {isOwner && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(`/challenges/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
          >
            ✏️ تعديل
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white"
          >
            🗑️ حذف
          </button>
        </div>
      )}
    </div>
  );
}

export default ChallengeDetails;
