/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin. PUBLIC — inlined into the client bundle at build time. */
  readonly VITE_SITE_URL: string
  /** WhatsApp number, E.164 without '+'. PUBLIC — inlined into the bundle. */
  readonly VITE_WHATSAPP_NUMBER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
