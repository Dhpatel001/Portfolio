export const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

export type ApiError = {
  message?: string
  errors?: unknown
}

export async function postJson<TResponse>(
  path: string,
  body: unknown,
): Promise<{ ok: true; data: TResponse } | { ok: false; status: number; error: ApiError }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  const json = text ? (JSON.parse(text) as unknown) : undefined

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: (json as ApiError | undefined) ?? { message: 'Request failed' },
    }
  }

  return { ok: true, data: json as TResponse }
}
