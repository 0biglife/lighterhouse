// Google PSI 함수
export async function analyzeWithPSI(url: string, key: string) {
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&strategy=desktop&category=performance&category=accessibility&category=seo&category=best-practices&key=${key}`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("PSI 호출 실패");

  const json = await res.json();
  return json.lighthouseResult; // 핵심 데이터
}
