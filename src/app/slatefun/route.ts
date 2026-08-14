const ENDPOINT =
  "https://kkk-86862428.development.localcatalystserverless.com/server/slatefun/";

export async function GET() {
  try {
    const upstream = await fetch(ENDPOINT, {
      headers: { Accept: "application/json, text/plain, */*" },
      cache: "no-store",
    });

    const body = await upstream.text();
    const contentType = upstream.headers.get("content-type") ?? "text/plain";

    return new Response(body, {
      status: upstream.status,
      headers: { "content-type": contentType },
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to reach the endpoint",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }
}
