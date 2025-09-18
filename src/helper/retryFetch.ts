async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 1,
  delay = 2000
) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    const json = await res.json();
    return json?.data ?? [];
  } catch (err) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay);
    } else {
      console.error(`Fetch failed after retry: ${url}`, err);
      return null; // or [] depending on what you want
    }
  }
}
