import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LogoPair } from './LogoPair'

describe('LogoPair', () => {
  it('renders the logo image with alt text and visible label', () => {
    render(<LogoPair src="logos/auth0.png" alt="Auth0" text="Auth0" />)

    const img = screen.getByAltText('Auth0')
    expect(img).toHaveAttribute('src', 'logos/auth0.png')
    expect(screen.getByText('Auth0')).toBeInTheDocument()
  })

  it('marks the logo for lazy decoding with explicit dimensions to avoid CLS', () => {
    render(<LogoPair src="logos/foo.png" alt="Foo" text="Foo" />)

    const img = screen.getByAltText('Foo')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('decoding', 'async')
    expect(img).toHaveAttribute('width', '64')
    expect(img).toHaveAttribute('height', '64')
  })

  it('does not register an onError handler that could create a fallback loop', () => {
    const { container } = render(
      <LogoPair src="logos/missing.png" alt="Missing" text="Missing" />,
    )
    const img = container.querySelector('img')
    expect(img?.getAttribute('onerror')).toBeNull()
  })
})
