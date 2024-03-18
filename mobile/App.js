import { StatusBar } from 'expo-status-bar';
import AuthContextProvider from './context/auth';
import CompetenciesContextProvider from './context/competencies';
import MainNavigator from './router/MainNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export default function App() {
  return (
    <AuthContextProvider>
      <CompetenciesContextProvider>
        <QueryClientProvider client={client}>
          <MainNavigator />
          <StatusBar style="light" />
        </QueryClientProvider>
      </CompetenciesContextProvider>
    </AuthContextProvider>
  );
}


