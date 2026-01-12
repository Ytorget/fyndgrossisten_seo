/**
 * Phoenix integration utilities
 * Provides CSRF token handling for secure API calls to Phoenix backend
 */

/**
 * Gets the Phoenix CSRF token from the meta tag
 * This token is injected by Phoenix into the HTML head
 */
export function getPhoenixCSRFToken(): string | null {
  return document
    ?.querySelector("meta[name='csrf-token']")
    ?.getAttribute("content") || null;
}

/**
 * Builds headers object with CSRF token for Phoenix applications
 * Returns headers object with X-CSRF-Token (if available)
 * 
 * @param headers - Optional additional headers to merge
 * @returns Headers object with CSRF token
 * 
 * @example
 * const response = await fetch('/api/endpoint', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     ...buildCSRFHeaders(),
 *   },
 *   body: JSON.stringify(data)
 * });
 */
export function buildCSRFHeaders(headers: Record<string, string> = {}): Record<string, string> {
  const csrfToken = getPhoenixCSRFToken();
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  return headers;
}
