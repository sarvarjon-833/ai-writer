interface ImportMetaEnv {
  readonly VITE_GEMINI_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
