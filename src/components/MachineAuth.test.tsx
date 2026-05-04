import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NodeCard } from './MachineAuth'

const node = {
  id: 'test',
  name: 'Test Node',
  sub: 'subtitle line',
  src: 'logos/test.png',
  color: '#ff0000',
  snark: 'snarky tooltip text',
}

describe('NodeCard', () => {
  it('renders the node name and subtitle', () => {
    render(<NodeCard node={node} />)

    expect(screen.getByText('Test Node')).toBeInTheDocument()
    expect(screen.getByText('subtitle line')).toBeInTheDocument()
  })

  it('hides the decorative logo from assistive tech', () => {
    const { container } = render(<NodeCard node={node} />)

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(img).toHaveAttribute('alt', '')
  })

  it('renders without role=button to avoid implying activatability', () => {
    render(<NodeCard node={node} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('hides the tooltip by default', () => {
    render(<NodeCard node={node} />)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows the snark tooltip on hover and detaches it on mouse leave', async () => {
    const user = userEvent.setup()
    render(<NodeCard node={node} />)
    const trigger = screen.getByLabelText(/Test Node/)

    await user.hover(trigger)
    expect(screen.getByRole('tooltip')).toHaveTextContent('snarky tooltip text')
    expect(trigger).toHaveAttribute('aria-describedby')

    await user.unhover(trigger)
    // The tooltip node lingers briefly during framer-motion's exit animation,
    // so assert via the user-facing signal: aria-describedby is unlinked.
    expect(trigger).not.toHaveAttribute('aria-describedby')
  })

  it('shows the tooltip on keyboard focus and detaches it on blur', async () => {
    const user = userEvent.setup()
    render(<NodeCard node={node} />)
    const trigger = screen.getByLabelText(/Test Node/)

    await user.tab()
    expect(trigger).toHaveFocus()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-describedby')

    await user.tab()
    expect(trigger).not.toHaveAttribute('aria-describedby')
  })

  it('keeps the tooltip visible while focused even after a mouse leave', async () => {
    const user = userEvent.setup()
    render(<NodeCard node={node} />)
    const trigger = screen.getByLabelText(/Test Node/)

    await user.hover(trigger)
    trigger.focus()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(trigger)
    // Mouse left, but focus is still on the trigger — tooltip must remain.
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('exposes the tooltip via aria-describedby when active', async () => {
    const user = userEvent.setup()
    render(<NodeCard node={node} />)
    const trigger = screen.getByLabelText(/Test Node/)

    await user.hover(trigger)
    const tooltip = screen.getByRole('tooltip')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })
})
