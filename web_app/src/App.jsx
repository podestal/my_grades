import './app.css'
import Login from './pages/Login'
import Profile from './pages/Instructor/Profile'
import Grades from './pages/Instructor/Grades'
import Assignatures from './pages/Instructor/Assignatures'
import Home from './pages/landing/Home'
import Header from './components/header'
import PersisLogin from './components/PersisLogin'
import GradesDashboard from './components/GradesDashboard'
import Dashboard from './components/dashboard/Dashboard'
import { Routes, Route } from "react-router-dom"
import useAuth from './hooks/useAuth'

const App = () => {

  const { user } = useAuth()

  return (
    <main className='bg-[#00040f] h-[100vh]'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='login' element={<Login />}/>
        <Route element={<PersisLogin />}>
          <Route path='main' element={<Assignatures />}/>
          <Route path='califications' element={<Grades />}/>
          <Route path='profile' element={<Profile />}/>
          {/* <Route path='activities' element={<Activities />}/>
          <Route path='grades' element={<GradesByActivity />}/> */}
          <Route path='dashboard' element={<Dashboard />}/>
          
        </Route>
      </Routes>
    </main>
  )
}

export default App
