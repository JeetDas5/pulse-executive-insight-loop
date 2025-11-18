export type Metrics = {
    meetingMinutesLastWeek: number;
    meetingMinutesPreviousWeek: number;
    oldTasksCount: number;
    noteEntriesLastWeek: number;
    noteEntriesPreviousWeek: number;
}


export type Recommendation = {
    id: string;
    text: string;
    action?: string;
}

// Simple fake DB to demonstrate accept/skip state
const accepted: Record<string, string[]> = {}
const skipped: Record<string, string[]> = {}


export function fetchMetricsForUser(userId: string): Metrics {
    // In demo we return deterministic but realistic numbers. Replace with live integrations.
    return {
        meetingMinutesLastWeek: 160,
        meetingMinutesPreviousWeek: 130,
        oldTasksCount: 18,
        noteEntriesLastWeek: 3,
        noteEntriesPreviousWeek: 10,
    }
}

export function evaluateInsights(metrics: Metrics): Recommendation[] {
    const recs: Recommendation[] = []


    if (metrics.meetingMinutesLastWeek > metrics.meetingMinutesPreviousWeek * 1.15) {
        recs.push({
            id: 'meeting-load',
            text: `Your meeting time increased by ${Math.round(((metrics.meetingMinutesLastWeek / metrics.meetingMinutesPreviousWeek) - 1) * 100)}%. Schedule two focus blocks (90 min) next week?`,
            action: 'schedule-focus'
        })
    }


    if (metrics.oldTasksCount > 15) {
        recs.push({
            id: 'old-tasks',
            text: `You have ${metrics.oldTasksCount} tasks older than 14 days. Schedule a backlog review (30 min)?`,
            action: 'schedule-backlog'
        })
    }


    if (metrics.noteEntriesLastWeek < metrics.noteEntriesPreviousWeek * 0.5) {
        recs.push({
            id: 'note-capture',
            text: `Note capture dropped from ${metrics.noteEntriesPreviousWeek} to ${metrics.noteEntriesLastWeek}. Create a recurring "Insight Time" (45 min) on Fridays?`,
            action: 'create-insight-block'
        })
    }


    return recs
}


export function markAccepted(userId: string, recId: string) {
    accepted[userId] = accepted[userId] || []
    if (!accepted[userId].includes(recId)) accepted[userId].push(recId)
}


export function markSkipped(userId: string, recId: string) {
    skipped[userId] = skipped[userId] || []
    if (!skipped[userId].includes(recId)) skipped[userId].push(recId)
}


export function getAccepted(userId: string) {
    return accepted[userId] || []
}


export function getSkipped(userId: string) {
    return skipped[userId] || []
}