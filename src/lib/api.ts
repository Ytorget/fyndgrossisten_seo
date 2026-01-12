/**
 * API configuration and utilities for landing page
 * Re-exports from the generated ash_rpc.ts file and auth utilities
 */

export {
  createResellerRequest,
  buildCSRFHeaders,
  type CreateResellerRequestInput,
  type AshRpcError,
} from '@ash_rpc';

export {
  signInWithPassword,
  setAuthToken,
  getAuthToken,
  clearAuthToken,
  isAuthenticated,
  type SignInInput,
  type SignInResult,
} from './auth';
