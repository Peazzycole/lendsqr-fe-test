import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouter } from './routes'
import './styles/main.scss'
import { ToastContainer } from "react-toastify";


const queryClient = new QueryClient()


function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          position='top-center'
          theme='colored' autoClose={2000}
          toastStyle={{
            backgroundColor: '#39CDCC',
          }}
        />
      </QueryClientProvider>
    </div>
  )
}

export default App


