import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Singin from './pages/Singin'
import Singup from './pages/Singup'
import Profile from './pages/Profile'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sing-in' element={<Singin/>} />
        <Route path='/sing-up' element={<Singup/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About/>} />
    </Routes>
    </BrowserRouter>
  )
}
