export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""; // Browser should use relative path
  }

  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = new URL(path, getBaseUrl()).toString();
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
