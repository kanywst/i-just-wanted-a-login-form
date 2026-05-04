import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom does not implement IntersectionObserver, but framer-motion's
// whileInView relies on it. Provide a no-op stub that immediately reports
// "in view" so animation-gated content renders during tests.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn().mockReturnValue([])
  constructor(callback: IntersectionObserverCallback) {
    queueMicrotask(() => {
      callback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target: document.createElement('div'),
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: 0,
          },
        ],
        this,
      )
    })
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

afterEach(() => {
  cleanup()
})
