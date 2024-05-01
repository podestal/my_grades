import './app.css'
import Login from './pages/Login'
import Profile from './pages/Instructor/Profile'
import Grades from './pages/Instructor/Grades'
import Assignatures from './pages/Instructor/Assignatures'
import Home from './pages/landing/Home'
import PersisLogin from './components/PersisLogin'
import GradesDashboard from './components/GradesDashboard'
import Header from './components/Header'
import Categories from './pages/Instructor/Categories'
import Dashboard from './components/dashboard/Dashboard'
import ActivityPage from './pages/Instructor/ActivityPage'
import { Routes, Route } from "react-router-dom"
import useAuth from './hooks/useAuth'
import LangingHeader from './pages/landing/LangingHeader'
import Contact from './pages/Contact'

const App = () => {

  const { user } = useAuth()

  return (
    <main className="bg-primary w-full overflow-hidden">
      {user.access ? <Header /> : <LangingHeader />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='login' element={<Login />}/>
        <Route path='contact' element={<Contact />}/>
        <Route element={<PersisLogin />}>
          <Route path='main' element={<Assignatures />}/>
          <Route path='categories' element={<Categories />}/>
          <Route path='profile' element={<Profile />}/>
          {/* <Route path='activities' element={<Activities />}/>
          <Route path='grades' element={<GradesByActivity />}/> */}
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='activities' element={<ActivityPage />}/>
        </Route>
      </Routes>
    </main>
    // <Home />
  )
}

export default App
