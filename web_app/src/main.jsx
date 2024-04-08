import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContextProvider from './context/auth.jsx'
import AssignatureContextProvider from './context/assignatures.jsx'
import ActivitiesContextprovider from './context/activities.jsx'
import GradesContextProvider from './context/grades.jsx'
import StudentContextProvider from './context/students.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <AssignatureContextProvider>
        <ActivitiesContextprovider>
          <GradesContextProvider>
            <StudentContextProvider>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </QueryClientProvider>
            </StudentContextProvider>
          </GradesContextProvider>
        </ActivitiesContextprovider>
      </AssignatureContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>,
)
