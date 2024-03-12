import { StatusBar } from 'expo-status-bar';
import AuthContextProvider from './context/auth';
import MainNavigator from './router/MainNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <MainNavigator />
        <StatusBar style="light" />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}


