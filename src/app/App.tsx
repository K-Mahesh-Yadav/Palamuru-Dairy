import { business } from '@content/business'
import { Container, Heading, Section } from '@shared/ui'

export function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <main id="main">
        <Section tone="sage" labelledBy="site-title">
          <Container>
            <Heading as="h1" variant="hero" id="site-title">
              {business.name}
            </Heading>
          </Container>
        </Section>
      </main>
    </>
  )
}
