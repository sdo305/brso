export function apiBase(): string {
  return 'https://bourso-omerta-proxy.hugairke14324.workers.dev';
}

export async function apiPost<T = unknown>(path: string, body: object, ms = 12000): Promise<T> {
  const c = new AbortController();
  const id = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(`${apiBase()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: c.signal,
    });
    return (await r.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

export async function apiGet<T = unknown>(path: string, ms = 8000): Promise<T> {
  const c = new AbortController();
  const id = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(`${apiBase()}${path}`, { signal: c.signal });
    return (await r.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
