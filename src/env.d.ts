/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEMPO: string
  readonly VITE_BASE_PATH: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 