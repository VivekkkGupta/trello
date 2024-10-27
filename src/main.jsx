import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TrelloProvider } from './contexts/TrelloContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrelloProvider>
      <App />
    </TrelloProvider>
  </StrictMode>,
)
