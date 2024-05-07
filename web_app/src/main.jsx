import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './context/auth.jsx'
import AssignatureContextProvider from './context/assignatures.jsx'
import ActivitiesContextprovider from './context/activities.jsx'
import GradesContextProvider from './context/grades.jsx'
import StudentContextProvider from './context/students.jsx'
import CategoriesContextProvider from './context/categories.jsx'
import AnnouncementsContextProvider from './context/announcemnts.jsx'
import ClasesContextProvider from './context/clases.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <AssignatureContextProvider>
        <ClasesContextProvider>
          <ActivitiesContextprovider>
            <GradesContextProvider>
              <StudentContextProvider>
                <CategoriesContextProvider>
                  <AnnouncementsContextProvider>
                    <QueryClientProvider client={queryClient}>
                      <BrowserRouter>
                        <App />
                      </BrowserRouter>
                    </QueryClientProvider>
                  </AnnouncementsContextProvider>
                </CategoriesContextProvider>
              </StudentContextProvider>
            </GradesContextProvider>
          </ActivitiesContextprovider>
        </ClasesContextProvider>
      </AssignatureContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>,
)
