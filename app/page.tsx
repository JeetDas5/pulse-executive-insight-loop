import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-extrabold mb-4">
        Pulse — Executive Insight Loop
      </h1>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        A demo app showing a proactive AI COO feature that detects personal
        productivity patterns and offers actionable recommendations.
      </p>
      <div className="space-x-3">
        <Link
          href="/insights"
          className="inline-block px-6 py-3 bg-pulseGreen text-white rounded-lg shadow"
        >
          View Insight Brief
        </Link>
      </div>
    </div>
  );
}
