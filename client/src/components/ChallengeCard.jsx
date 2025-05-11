import { Link } from 'react-router-dom';

function ChallengeCard({ challenge }) {
  return (
    <Link
      to={`/challenges/${challenge.id}`}
      className="block w-full max-w-xl mx-auto bg-white/5 border border-white/10 p-5 rounded-lg shadow-md hover:shadow-lg transition hover:bg-white/10"
    >
      {/* العنوان */}
      <h3 className="text-xl font-semibold text-cyan-300 mb-2 line-clamp-1">
        {challenge.title}
      </h3>

      {/* الوصف */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
        {challenge.description}
      </p>

      {/* التاريخ */}
      <div className="text-xs text-gray-400 flex items-center gap-2">
        <span>📅</span>
        <span>
          من{' '}
          <span className="font-medium text-white">
            {new Date(challenge.start_date).toLocaleDateString()}
          </span>{' '}
          إلى{' '}
          <span className="font-medium text-white">
            {new Date(challenge.end_date).toLocaleDateString()}
          </span>
        </span>
      </div>
    </Link>
  );
}

export default ChallengeCard;
