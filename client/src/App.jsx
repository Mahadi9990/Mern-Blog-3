import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Singin from './pages/Singin'
import Singup from './pages/Singup'
import Profile from './pages/Profile'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import IsAdminPrivateRoute from './components/IsAdminPrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sing-in' element={<Singin/>} />
        <Route path='/sing-up' element={<Singup/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />} >
            <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<IsAdminPrivateRoute />} >
            <Route path='/create-post' element={<CreatePost/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
