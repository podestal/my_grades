import './app.css'
import Login from './pages/Login'
import Profile from './pages/Instructor/Profile'
import Grades from './pages/Instructor/Grades'
import AssignaturesPage from './pages/Instructor/AssignaturesPage'
import Home from './pages/landing/Home'
import PersisLogin from './components/PersisLogin'
import GradesDashboard from './components/GradesDashboard'
import Header from './components/Header'
import SingleActivity from './components/activities/SingleActivity'
import Categories from './pages/Instructor/Categories'
import Dashboard from './components/dashboard/Dashboard'
import ActivityPage from './pages/Instructor/ActivityPage'
import Announcements from './pages/Instructor/Announcements'
import StatsPage from './pages/Instructor/StatsPage'
import { Routes, Route } from "react-router-dom"
import useAuth from './hooks/useAuth'
import LangingHeader from './pages/landing/LangingHeader'
import Contact from './pages/Contact'
import { useQueries } from '@tanstack/react-query'
import { getAssignatures } from './api/api'
import GetData from './components/getters/GetData'

const App = () => {

  const { user } = useAuth()
  // bg-primary w-full overflow-hidden
  return (
    <main className={`bg-primary w-full overflow-hidden ${user.access && 'flex gap-12 justify-between'}`}>
      {user.access && <GetData user={user}/>}
      {user.access 
      ? 
      <div className='w-[240px] '>
        <Header /> 
      </div>: 
      <LangingHeader />
      }
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='login' element={<Login />}/>
          <Route path='contact' element={<Contact />}/>
          <Route element={<PersisLogin />}>
            <Route path='main' element={<AssignaturesPage />}/>
            <Route path='categories' element={<Categories />}/>
            <Route path='profile' element={<Profile />}/>
            {/* <Route path='activities' element={<Activities />}/>
            <Route path='grades' element={<GradesByActivity />}/> */}
            <Route path='dashboard' element={<Dashboard />}/>
            <Route path='activities' element={<ActivityPage />}/>
            <Route path='activity' element={<SingleActivity />}/>
            <Route path='announcements' element={<Announcements />}/>
            <Route path='stats' element={<StatsPage />}/>
          </Route>
        </Routes>

    </main>
    // <Home />
  )
}

export default App
