import { useState, useEffect } from 'react';
import { buildCSRFHeaders } from '@ash_rpc';

/**
 * Check if user has an active session using the 'me' RPC action
 * Only checks on mount, no polling
 */
export function useSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('/rpc/run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...buildCSRFHeaders(),
          },
          body: JSON.stringify({
            action: 'me',
            fields: ['id'],
          }),
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          setIsLoggedIn(result.success === true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    checkSession();
  }, []);

  return { isLoggedIn };
}
