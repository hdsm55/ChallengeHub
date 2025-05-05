import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function ChallengeDetails() {
  const { id } = useParams(); // ← يأخذ ID التحدي من الرابط
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

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!challenge) return <p>جاري التحميل...</p>;

  const isOwner = user && user.id === challenge.creator_id;

  const handleDelete = async () => {
    if (!token) return;

    const confirm = window.confirm('هل أنت متأكد من حذف التحدي؟');
    if (!confirm) return;

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
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p>
        📅 {new Date(challenge.start_date).toLocaleDateString()} →{' '}
        {new Date(challenge.end_date).toLocaleDateString()}
      </p>

      {isOwner && (
        <>
          <button onClick={() => navigate(`/challenges/${id}/edit`)}>
            ✏️ تعديل
          </button>
          <button
            onClick={handleDelete}
            style={{ marginLeft: '1rem', color: 'red' }}
          >
            🗑️ حذف
          </button>
        </>
      )}
    </div>
  );
}

export default ChallengeDetails;
