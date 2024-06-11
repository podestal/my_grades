import './app.css'
import Login from './pages/Login'
import Profile from './pages/Instructor/Profile'
import AssignaturesPage from './pages/Instructor/AssignaturesPage'
import Home from './pages/landing/Home'
import PersisLogin from './components/PersisLogin'
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
import GetData from './components/getters/GetData'
import StudentPage from './pages/prinicipal/StudentPage'
import ReportPage from './pages/prinicipal/ReportPage'

const App = () => {



  const { user } = useAuth()
  return (
    <main className={`bg-primary w-full overflow-hidden min-h=[100vh] ${user.access && 'flex gap-12 justify-between'}`}>
      {/* {user.access && <GetData user={user}/>} */}
      {user.access 
      ? 
      <div className='w-[240px] '>
        <Header /> 
      </div>
      :
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
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='activities' element={<ActivityPage />}/>
          <Route path='activity' element={<SingleActivity />}/>
          <Route path='announcements' element={<Announcements />}/>
          <Route path='stats' element={<StatsPage />}/>
          <Route path='students' element={<StudentPage />}/>
          <Route path='report' element={<ReportPage />}/>
        </Route>
      </Routes>

    </main>
  )
}

export default App
