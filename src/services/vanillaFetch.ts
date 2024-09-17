export async function vanillaFetch(
  resource: string,
  options: { timeout?: number } & RequestInit = {},
): Promise<Response> {
  const { timeout = 30 * 1000 } = options; // 30 seconds

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}
