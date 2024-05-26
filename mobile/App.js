import { StatusBar } from 'expo-status-bar';
import AuthContextProvider from './context/auth';
import CompetenciesContextProvider from './context/competencies';
import AssignatureContextProvider from './context/assignatures';
import MainNavigator from './router/MainNavigator';
import GradesContextProvider from './context/grades';
import ActivityContextProvider from './context/activities';
import ClaseContextProvider from './context/clases';
import StudentContextProvider from './context/students';
import TutorContextProvider from './context/tutor';
import CategoryContextProvider from './context/categories';
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
                <StudentContextProvider>
                  <TutorContextProvider>
                    <CategoryContextProvider>
                        <QueryClientProvider client={client}>
                          <MainNavigator />
                          <StatusBar style="light" />
                        </QueryClientProvider>
                    </CategoryContextProvider>
                  </TutorContextProvider>
                </StudentContextProvider>
              </ClaseContextProvider>
            </GradesContextProvider>
          </ActivityContextProvider>
        </AssignatureContextProvider>
      </CompetenciesContextProvider>
    </AuthContextProvider>
  );
}


