import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages import
import Home from './Pages/home'
import Register from './Pages/register'
import Login from './Pages/login'
import Profile from './Pages/profile'
import ForgotPass from './Pages/forgotPass'
import UpdateProfile from './Pages/updateProfile'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot-password' element={<ForgotPass />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
