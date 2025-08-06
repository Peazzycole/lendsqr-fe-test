import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouter } from './routes'
import './styles/main.scss'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()


function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster position="top-center" richColors duration={2000} />
      </QueryClientProvider>
    </div>
  )
}

export default App
