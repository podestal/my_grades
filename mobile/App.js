import { StatusBar } from 'expo-status-bar';
import AuthContextProvider from './context/auth';
import CompetenciesContextProvider from './context/competencies';
import AssignatureContextProvider from './context/assignatures';
import MainNavigator from './router/MainNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export default function App() {
  return (
    <AuthContextProvider>
      <CompetenciesContextProvider>
        <AssignatureContextProvider>
          <QueryClientProvider client={client}>
            <MainNavigator />
            <StatusBar style="light" />
          </QueryClientProvider>
        </AssignatureContextProvider>
      </CompetenciesContextProvider>
    </AuthContextProvider>
  );
}


