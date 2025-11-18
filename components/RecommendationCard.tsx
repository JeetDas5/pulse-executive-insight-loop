export default function RecommendationCard({
  id,
  text,
  onAccept,
  onSkip,
}: {
  id: string;
  text: string;
  onAccept: (id: string) => void;
  onSkip?: (id: string) => void;
  action?: string;
}) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="text-gray-800">{text}</div>
      <div className="flex gap-2">
        <button
          onClick={() => onSkip?.(id)}
          className="px-3 py-2 rounded border text-sm hover:bg-gray-200/80 cursor-pointer"
        >
          Skip
        </button>
        <button
          onClick={() => onAccept(id)}
          className="px-4 py-2 rounded bg-pulseGreen hover:bg-pulseGreen/80 text-white text-sm cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
