// app/insights/page.tsx
'use client';

import { useEffect, useState } from 'react';
import MetricsSummary from '../../components/MetricsSummary';
import RecommendationCard from '../../components/RecommendationCard';

interface Metrics {
  meetingMinutesLastWeek: number;
  meetingMinutesPreviousWeek: number;
  oldTasksCount: number;
  noteEntriesLastWeek: number;
  noteEntriesPreviousWeek: number;
}

interface Recommendation {
  id: string;
  text: string;
  action: string;
}

export default function InsightsPage() {
  const userId = 'USER123'; // in real app: get from auth context
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  useEffect(() => {
    fetch(`/api/insight-brief/${userId}`)
      .then(res => res.json())
      .then((data) => {
        setMetrics(data.metrics);
        setRecs(data.recommendations);
      });
  }, [userId]);

  const handleAccept = (id: string) => {
    fetch(`/api/accept-recommendation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, recommendationId: id })
    }).then(() => {
      // remove accepted rec from UI
      setRecs(current => current.filter(r => r.id !== id));
    });
  };

  if (!metrics) return <div className="p-8">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 py-0">
      <h1 className="text-2xl font-bold mb-6">Executive Insight Brief</h1>
      <MetricsSummary
        meetingMinutesLastWeek={metrics.meetingMinutesLastWeek}
        meetingMinutesPreviousWeek={metrics.meetingMinutesPreviousWeek}
        oldTasksCount={metrics.oldTasksCount}
        noteEntriesLastWeek={metrics.noteEntriesLastWeek}
        noteEntriesPreviousWeek={metrics.noteEntriesPreviousWeek}
      />
      <div className="mt-8 space-y-4">
        {recs.map(r => (
          <RecommendationCard key={r.id} id={r.id} text={r.text} action={r.action} onAccept={handleAccept} />
        ))}
      </div>
    </div>
  );
}
