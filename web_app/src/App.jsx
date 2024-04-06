import './app.css'
import Login from './pages/Login'
import InstructorMain from './pages/InstructorMain'
import Home from './pages/Home'
import Header from './components/header'
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
        {user?.access && <Route path='main' element={<InstructorMain />}/>}
      </Routes>
    </>
  )
}

export default App
