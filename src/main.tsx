import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UsersProvider } from './context/UsersContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
  </StrictMode>,
)
