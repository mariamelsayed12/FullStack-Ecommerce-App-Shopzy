import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import InternetConnectionProvider from './provider/InternetConnectionServicesProvider.tsx'
import { theme } from './theme/index.ts'



const queryClient = new QueryClient()



createRoot(document.getElementById('root')!).render(
<QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <InternetConnectionProvider>
      <ChakraProvider theme={theme}> 
              <App />
      </ChakraProvider>
    </InternetConnectionProvider>
  </Provider>
</QueryClientProvider>


)
