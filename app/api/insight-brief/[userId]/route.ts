// app/api/insight-brief/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  fetchMetricsForUser,
  evaluateInsights,
  getAccepted,
  getSkipped,
} from '@/lib/analytics'

/**
 * GET /api/insight-brief?userId=demo
 *
 * Returns:
 * {
 *   userId: string,
 *   metrics: { ... },
 *   recommendations: [{ id, text, action? }, ...]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId') || 'demo'

    // Fetch metrics (in demo: in-memory/fake)
    const metrics = fetchMetricsForUser(userId)

    // Evaluate all possible recommendations based on metrics
    const allRecommendations = evaluateInsights(metrics)

    // Filter out items user has already accepted or skipped (so UI only shows actionable recs)
    const accepted = getAccepted(userId)
    const skipped = getSkipped(userId)
    const recommendations = allRecommendations.filter(
      (r) => !accepted.includes(r.id) && !skipped.includes(r.id)
    )

    return NextResponse.json({ userId, metrics, recommendations })
  } catch (err) {
    console.error('insight-brief error', err)
    return NextResponse.json(
      { error: 'Failed to compute insight brief' },
      { status: 500 }
    )
  }
}
