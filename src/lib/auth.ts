/**
 * Authentication utilities for landing page
 * Manually implemented until AshTypescript generates these
 */

import { buildCSRFHeaders } from '@ash_rpc';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInResult =
  | {
      success: true;
      data: {
        id: string;
        email: string;
        // Token is merged at top level when metadataFields includes "token"
        // (AshTypescript merges metadata fields directly into the result, not under __metadata__)
        token?: string;
      };
    }
  | {
      success: false;
      errors: Array<{
        type: string;
        message: string;
        field?: string;
        fieldPath?: string;
        details?: Record<string, any>;
      }>;
    };

export async function signInWithPassword(config: {
  input: SignInInput;
  headers?: Record<string, string>;
}): Promise<SignInResult> {
  const payload = {
    action: "sign_in_with_password",
    input: config.input,
    fields: ["id", "email"],
    metadataFields: ["token"], // Request the token from action metadata
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...buildCSRFHeaders(),
    ...config.headers,
  };

  const response = await fetch("/rpc/run", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  // Handle CSRF token expiration (403 error)
  // This can happen after logout when the session changes but the page still has old tokens
  if (response.status === 403) {
    // Reload the page to get a fresh CSRF token from Phoenix
    window.location.reload();
    // Return a pending state while page reloads
    return {
      success: false,
      errors: [{ type: "csrf_expired", message: "Session uppdateras, vänligen försök igen...", details: {} }],
    };
  }

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      errors: [{ type: "network", message: response.statusText, details: {} }],
    };
  }

  return result as SignInResult;
}

export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function clearAuthToken() {
  localStorage.removeItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Exchange JWT token for a session cookie via RPC
 * This enables navigation to /app routes which use session-based auth
 */
export async function exchangeTokenForSession(token: string): Promise<boolean> {
  try {
    const payload = {
      action: 'exchange_token_for_session',
      input: { token },
      fields: ['id', 'email'],
      metadataFields: ['token'],
    };

    const response = await fetch('/rpc/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...buildCSRFHeaders(),
      },
      body: JSON.stringify(payload),
      credentials: 'include', // Important: include cookies
    });

    // Handle CSRF token expiration (403 error)
    if (response.status === 403) {
      // Reload the page to get a fresh CSRF token from Phoenix
      window.location.reload();
      return false;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[exchangeTokenForSession] Response not OK:', errorText);
      return false;
    }

    const result = await response.json();

    if (result.success) {
      // The RPC endpoint should have set the session cookie
      // The session_token metadata is available if needed
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
