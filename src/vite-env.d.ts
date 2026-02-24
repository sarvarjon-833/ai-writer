interface ImportMetaEnv {
  readonly VITE_GEMINI_KEY: string;
  readonly VITE_SENTRY_DSN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
