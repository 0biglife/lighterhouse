import { analyzeWithPSI } from "@/lib/lighthouse";

export async function POST(req: Request) {
  const { url } = await req.json();

  // 이 케이스는 화면 단에서 막아둠
  // if (!url || !/^https?:\/\//.test(url)) {
  //   return new Response(JSON.stringify({ error: "Invalid URL" }), {
  //     status: 400,
  //   });
  // }

  try {
    const data = await analyzeWithPSI(url, process.env.PSI_API_KEY!);
    return Response.json(data);
  } catch (err) {
    // return new Response(JSON.stringify({ error: (err as Error).message }), {
    //   status: 500,
    // });
    const msg = (err as Error).message;

    // 504 case
    // AWS Amplify Hosting에서 10초 타임아웃이 디폴트임
    // 수정은 AWS에서 지원하지 않기에 백엔드 로직으로 변경해야함 -> 0.5d

    // Failed to execute 'json' on 'Response': Unexpected end of JSON input

    const isTimeout =
      msg.includes("Timeout") ||
      msg.includes("504") ||
      msg.includes("network timeout") ||
      msg.includes("fetch") ||
      msg.includes("json") ||
      msg.includes("JSON input") ||
      msg.includes("end of JSON");

    return new Response(
      JSON.stringify({
        error: isTimeout
          ? "The PSI analysis request timed out due to AWS Amplify serverless function limits. We are currently working on improving this issue."
          : msg || "Failed to analyze the URL.",
      }),
      {
        status: 500,
      }
    );
  }
}
