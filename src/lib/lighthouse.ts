export async function analyzeWithPSI(url: string, key: string) {
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&strategy=desktop&category=performance&category=accessibility&category=seo&category=best-practices&key=${key}`;

  const res = await fetch(endpoint);
  let json;

  try {
    json = await res.json();
  } catch {
    throw new Error(
      "Failed to parse response from Google PSI. Please contact support at 0biglife@gmail.com."
    );
  }

  if (!res.ok || json.error) {
    const msg = json.error?.message || "Failed to call Google PSI Request.";
    const code = json.error?.code || res.status;
    const status = json.error?.status || "UNKNOWN";

    throw new Error(`[${status}-${code}] ${msg}`);
  }

  if (!json.lighthouseResult) {
    throw new Error(`Empty Lighthouse Response.`);
  }

  return json.lighthouseResult;
}
