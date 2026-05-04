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
      { timeout: 500 },
    )
  })

  it('formats numbers with locale-aware separators', async () => {
    const { result } = renderHook(() => useCountUp(8200, true, 50))
    await waitFor(
      () => expect(result.current.display).toBe('8,200'),
      { timeout: 500 },
    )
  })
})
