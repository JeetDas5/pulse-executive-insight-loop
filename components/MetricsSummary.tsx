export default function MetricsSummary(props: {
  meetingMinutesLastWeek: number;
  meetingMinutesPreviousWeek: number;
  oldTasksCount: number;
  noteEntriesLastWeek: number;
  noteEntriesPreviousWeek: number;
}) {
  const {
    meetingMinutesLastWeek,
    meetingMinutesPreviousWeek,
    oldTasksCount,
    noteEntriesLastWeek,
    noteEntriesPreviousWeek,
  } = props;

  const meetingDelta = Math.round(
    (meetingMinutesLastWeek / (meetingMinutesPreviousWeek || 1) - 1) * 100
  );
  const noteDelta = Math.round(
    (noteEntriesLastWeek / (noteEntriesPreviousWeek || 1) - 1) * 100
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-white border shadow-sm">
        <div className="text-xs text-gray-500">Meetings (last week)</div>
        <div className="text-2xl font-bold">{meetingMinutesLastWeek} min</div>
        <div className="text-sm text-gray-600">
          {meetingMinutesPreviousWeek} min previous ({meetingDelta}% change)
        </div>
      </div>

      <div className="p-4 rounded-lg bg-white border shadow-sm">
        <div className="text-xs text-gray-500">Old tasks &gt;14d</div>
        <div className="text-2xl font-bold">{oldTasksCount}</div>
        <div className="text-sm text-gray-600">Stalled tasks to review</div>
      </div>

      <div className="p-4 rounded-lg bg-white border shadow-sm">
        <div className="text-xs text-gray-500">Notes captured</div>
        <div className="text-2xl font-bold">{noteEntriesLastWeek}</div>
        <div className="text-sm text-gray-600">
          {noteEntriesPreviousWeek} prev ({noteDelta}% change)
        </div>
      </div>
    </div>
  );
}
