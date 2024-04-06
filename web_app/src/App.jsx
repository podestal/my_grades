import './app.css'
import Login from './pages/Login'
import Profile from './pages/Instructor/Profile'
import Grades from './pages/Instructor/Grades'
import Assignatures from './pages/Instructor/Assignatures'
import Home from './pages/Home'
import Header from './components/header'
import PersisLogin from './components/PersisLogin'
import { Routes, Route } from "react-router-dom"
import useAuth from './hooks/useAuth'

const App = () => {

  const { user } = useAuth()

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='login' element={<Login />}/>
        <Route element={<PersisLogin />}>
          <Route path='main' element={<Assignatures />}/>
          <Route path='grades' element={<Grades />}/>
          <Route path='profile' element={<Profile />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
