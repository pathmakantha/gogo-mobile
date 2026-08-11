import Config from 'react-native-config';

/**
 * GoGo-Api's actual deployed dev backend (Vercel), confirmed live 2026-08-11:
 * GET / -> "GOGO API", GET /tours -> 401 (auth middleware active, as expected).
 * The AWS Lambda URL in GoGo-Api/.env (DEV_API_URL) is not what's actually
 * serving traffic - this Vercel URL is.
 *
 * Sourced from the .env file at the repo root (see .env.example) via
 * react-native-config, so it's never hardcoded in source.
 */
export const API_BASE_URL = Config.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    'API_BASE_URL is not set — create a .env file at the repo root (see .env.example) and rebuild.',
  );
}
