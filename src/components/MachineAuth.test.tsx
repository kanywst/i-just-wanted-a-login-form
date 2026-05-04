import { describe, it, expect, vi } from 'vitest'
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
    render(
      <NodeCard
        node={node}
        isHovered={false}
        onEnter={() => {}}
        onLeave={() => {}}
      />,
    )

    expect(screen.getByText('Test Node')).toBeInTheDocument()
    expect(screen.getByText('subtitle line')).toBeInTheDocument()
  })

  it('hides the decorative logo from assistive tech', () => {
    const { container } = render(
      <NodeCard
        node={node}
        isHovered={false}
        onEnter={() => {}}
        onLeave={() => {}}
      />,
    )

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(img).toHaveAttribute('alt', '')
  })

  it('shows the snark tooltip when isHovered is true', () => {
    render(
      <NodeCard
        node={node}
        isHovered={true}
        onEnter={() => {}}
        onLeave={() => {}}
      />,
    )

    expect(screen.getByRole('tooltip')).toHaveTextContent('snarky tooltip text')
  })

  it('hides the tooltip when isHovered is false', () => {
    render(
      <NodeCard
        node={node}
        isHovered={false}
        onEnter={() => {}}
        onLeave={() => {}}
      />,
    )

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('fires onEnter when focused via keyboard for a11y parity with hover', async () => {
    const onEnter = vi.fn()
    render(
      <NodeCard
        node={node}
        isHovered={false}
        onEnter={onEnter}
        onLeave={() => {}}
      />,
    )

    await userEvent.tab()
    expect(onEnter).toHaveBeenCalled()
  })

  it('fires onLeave on blur', async () => {
    const onLeave = vi.fn()
    render(
      <NodeCard
        node={node}
        isHovered={false}
        onEnter={() => {}}
        onLeave={onLeave}
      />,
    )

    await userEvent.tab()
    await userEvent.tab()
    expect(onLeave).toHaveBeenCalled()
  })

  it('exposes the tooltip via aria-describedby when active', () => {
    render(
      <NodeCard
        node={node}
        isHovered={true}
        onEnter={() => {}}
        onLeave={() => {}}
      />,
    )

    const trigger = screen.getByRole('button', { name: /Test Node/ })
    const tooltip = screen.getByRole('tooltip')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })
})
