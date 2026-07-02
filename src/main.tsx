import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import '@fontsource/bebas-neue/400.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import '@fontsource/space-mono/400-italic.css'
import '@fontsource/space-mono/700-italic.css'
import App from './App.tsx'
import './index.css'

// LazyMotion + the `m` component load only the DOM animation feature set
// (animations, variants, exit, gestures, whileInView) instead of the full
// `motion` bundle. `strict` throws if any `motion.*` sneaks back in.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
