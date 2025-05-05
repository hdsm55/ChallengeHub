import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Challenges() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const showAddButton = !!token; // يظهر زر الإضافة فقط للمسجلين

  // ❌ نحذفه أو نعلقه لأنه يمنع المستخدم غير المسجل
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    // نجلب التحديات للجميع (مسجل أو غير مسجل)
    const fetchChallenges = async () => {
      try {
        const response = await api.get('/challenges');
        setChallenges(response.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching challenges:', err);
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      {showAddButton && (
        <button
          onClick={() => navigate('/add')}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          ➕ إضافة تحدٍ جديد
        </button>
      )}
      <h2>📚 قائمة التحديات</h2>
      {challenges.length === 0 ? (
        <p>لا توجد تحديات بعد.</p>
      ) : (
        challenges.map((challenge) => (
          <div
            key={challenge.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/challenges/${challenge.id}`)} // ← تهيئة للخطوة القادمة
          >
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <small>
              تاريخ البدء: {new Date(challenge.start_date).toLocaleDateString()}
            </small>
            <br />
            <small>
              تاريخ الانتهاء:{' '}
              {new Date(challenge.end_date).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Challenges;
