function ATSScore({ score }) {
  if (score === null || score === undefined) return null;
  let colorClass = score > 70 ? 'text-green-700' : score > 40 ? 'text-yellow-700' : 'text-red-700';

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded text-center font-semibold">
      ATS Match Score:{' '}
      <span className={`text-3xl font-bold ${colorClass}`}>{score}%</span>
    </div>
  );
}

export default ATSScore;
