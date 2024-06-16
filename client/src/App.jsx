import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Singin from './pages/Singin'
import Singup from './pages/Singup'
import Profile from './pages/Profile'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sing-in' element={<Singin/>} />
        <Route path='/sing-up' element={<Singup/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
