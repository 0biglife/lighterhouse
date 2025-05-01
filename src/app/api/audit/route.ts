import { analyzeWithPSI } from "@/lib/lighthouse";

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url || !/^https?:\/\//.test(url)) {
    return new Response(JSON.stringify({ error: "Invalid URL" }), {
      status: 400,
    });
  }

  try {
    const data = await analyzeWithPSI(url, process.env.PSI_API_KEY!);
    return Response.json(data);
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
    });
  }
}
