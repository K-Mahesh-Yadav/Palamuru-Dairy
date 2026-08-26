import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Rendered instead of children when a descendant throws. */
  fallback: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * ONE boundary, at the app root (PLAN.md B4.5).
 *
 * The justification is thin but real: this site has no dynamic data, yet it
 * can still white-screen when a lazy chunk 404s against a stale CDN cache
 * after a deploy. The fallback shows the phone number and address as static
 * markup, so the page still does its job when React cannot.
 *
 * Deliberately NOT per-section — there is no independently failing subsystem.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // No error-reporting service is wired up (and none is planned — it would
    // require loosening connect-src). The console is the whole story.
    console.error('Palamuru Dairy: render failed', error, info.componentStack)
  }

  override render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
