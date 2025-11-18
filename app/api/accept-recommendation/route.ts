// filepath: app/api/accept-recommendation/route.ts
interface AcceptRequest {
  userId: string;
  recommendationId: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AcceptRequest;
    const { userId, recommendationId } = body ?? {}
    if (!userId || !recommendationId) {
      return new Response(JSON.stringify({ status: 'error', performed: false }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    // TODO: implement actual scheduling / action logic; placeholder logging until integration
    console.log(`User ${userId} accepted recommendation ${recommendationId}`);
    return new Response(JSON.stringify({ status: 'ok', performed: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Error parsing request body in POST /api/accept-recommendation', err);
    return new Response(JSON.stringify({ status: 'error', performed: false }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
