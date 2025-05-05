import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function EditChallenge() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await api.get(`/challenges/${id}`);
        const c = response.data;
        setTitle(c.title);
        setDescription(c.description);
        setStartDate(c.start_date.slice(0, 10));
        setEndDate(c.end_date.slice(0, 10));
      } catch (err) {
        console.error('❌ فشل جلب التحدي:', err);
        setError('فشل جلب التحدي');
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/challenges/${id}`,
        {
          title,
          description,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ تم التعديل بنجاح');
      navigate(`/challenges/${id}`);
    } catch (err) {
      console.error('❌ فشل التعديل:', err);
      setError('❌ فشل التعديل');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>✏️ تعديل التحدي</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">💾 حفظ التغييرات</button>
      </form>
    </div>
  );
}

export default EditChallenge;
