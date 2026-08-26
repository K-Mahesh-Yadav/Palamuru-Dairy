/// <reference types="vite/client" />

declare module '*.avif' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  /** Canonical origin. PUBLIC — inlined into the client bundle at build time. */
  readonly VITE_SITE_URL: string
  /** WhatsApp number, E.164 without '+'. PUBLIC — inlined into the bundle. */
  readonly VITE_WHATSAPP_NUMBER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
