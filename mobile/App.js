import { StatusBar } from 'expo-status-bar';
import AuthContextProvider from './context/auth';
import CompetenciesContextProvider from './context/competencies';
import AssignatureContextProvider from './context/assignatures';
import MainNavigator from './router/MainNavigator';
import GradesContextProvider from './context/grades';
import ActivityContextProvider from './context/activities';
import ClaseContextProvider from './context/clases';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export default function App() {
  return (
    <AuthContextProvider>
      <CompetenciesContextProvider>
        <AssignatureContextProvider>
          <ActivityContextProvider>
            <GradesContextProvider>
              <ClaseContextProvider>
                <QueryClientProvider client={client}>
                  <MainNavigator />
                  <StatusBar style="light" />
                </QueryClientProvider>
              </ClaseContextProvider>
            </GradesContextProvider>
          </ActivityContextProvider>
        </AssignatureContextProvider>
      </CompetenciesContextProvider>
    </AuthContextProvider>
  );
}


