import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useCountUp } from './useCountUp'

describe('useCountUp', () => {
  it('starts at zero with prefix and suffix', () => {
    const { result } = renderHook(() => useCountUp(100, false, 1000, '$', '/mo'))
    expect(result.current.display).toBe('$0/mo')
  })

  it('does not animate while shouldStart is false', async () => {
    const { result } = renderHook(() => useCountUp(100, false, 50))
    await new Promise((r) => setTimeout(r, 100))
    expect(result.current.display).toBe('0')
  })

  it('reaches the target value when animation completes', async () => {
    const { result } = renderHook(() => useCountUp(1000, true, 50, '', ' lines'))
    await waitFor(
      () => expect(result.current.display).toBe('1,000 lines'),
      // Generous ceiling: rAF ticks can be starved on a loaded CI runner,
      // so the count-up may take far longer than its 50ms nominal duration.
      // waitFor resolves as soon as the value lands, so this doesn't slow
      // down healthy runs — it only prevents a timing flake.
      { timeout: 3000 },
    )
  })

  it('formats numbers with locale-aware separators', async () => {
    const { result } = renderHook(() => useCountUp(8200, true, 50))
    await waitFor(
      () => expect(result.current.display).toBe('8,200'),
      // Generous ceiling: rAF ticks can be starved on a loaded CI runner,
      // so the count-up may take far longer than its 50ms nominal duration.
      // waitFor resolves as soon as the value lands, so this doesn't slow
      // down healthy runs — it only prevents a timing flake.
      { timeout: 3000 },
    )
  })

  it('keeps fractional targets instead of rounding them', async () => {
    const { result } = renderHook(() => useCountUp(6.5, true, 50, ' $', 'B '))
    expect(result.current.display).toBe(' $0.0B ')
    await waitFor(
      () => expect(result.current.display).toBe(' $6.5B '),
      { timeout: 3000 },
    )
  })
})
