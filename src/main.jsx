import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const myElement = (
  <div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
