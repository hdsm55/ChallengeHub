import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AddChallenge() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('✅ تم إضافة التحدي بنجاح!');
      navigate('/challenges');
    } catch (err) {
      toast.error(err.response?.data?.error || 'حدث خطأ أثناء الإضافة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/5 p-8 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">
        📝 إضافة تحدٍ جديد
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">📌 العنوان</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-white/10 p-2 rounded text-white placeholder:text-gray-400"
            placeholder="مثال: تحدي القراءة"
          />
        </div>
        <div>
          <label className="block mb-1">🧠 الوصف</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full bg-white/10 p-2 rounded text-white placeholder:text-gray-400"
            placeholder="اشرح التحدي بإيجاز..."
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">📅 البداية</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full bg-white/10 p-2 rounded text-white"
            />
          </div>
          <div>
            <label className="block mb-1">📅 النهاية</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full bg-white/10 p-2 rounded text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded font-bold hover:scale-[1.02] transition"
        >
          {loading ? '🚀 جاري الإضافة...' : '➕ أضف التحدي'}
        </button>
      </form>
    </div>
  );
}

export default AddChallenge;
