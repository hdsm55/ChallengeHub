import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AddChallenge() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  // ✅ حماية الصفحة: لا يمكن الوصول بدون توكن
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        '/challenges',
        {
          title,
          description,
          creator_id: user.id,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ← هنا نرسل التوكن للسيرفر
          },
        }
      );

      navigate('/challenges'); // إعادة التوجيه بعد النجاح
    } catch (err) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء الإضافة');
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h2>📝 إضافة تحدٍ جديد</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>عنوان التحدي</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>الوصف</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>تاريخ البداية</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>تاريخ النهاية</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">➕ إضافة التحدي</button>
      </form>
    </div>
  );
}

export default AddChallenge;
