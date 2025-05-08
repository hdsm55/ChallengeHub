import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function EditChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await api.get(`/challenges/${id}`);
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setStartDate(data.start_date.split('T')[0]);
        setEndDate(data.end_date.split('T')[0]);
      } catch (err) {
        toast.error('فشل تحميل بيانات التحدي');
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      toast.success('✅ تم تعديل التحدي بنجاح');
      navigate(`/challenges/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'حدث خطأ أثناء التعديل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/5 p-8 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">
        ✏️ تعديل التحدي
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">📌 العنوان</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-white/10 p-2 rounded text-white"
          />
        </div>
        <div>
          <label className="block mb-1">🧠 الوصف</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full bg-white/10 p-2 rounded text-white"
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
          {loading ? '🚀 جاري الحفظ...' : '💾 حفظ التعديلات'}
        </button>
      </form>
    </div>
  );
}

export default EditChallenge;
