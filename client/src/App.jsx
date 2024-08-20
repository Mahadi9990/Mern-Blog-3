import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Singin from './pages/Singin'
import Singup from './pages/Singup'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import IsAdminPrivateRoute from './components/IsAdminPrivateRoute'
import ScrollToTop from './components/ScrollToTop'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import Search from './pages/Search'
import Project from './pages/project'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/sing-in' element={<Singin/>} />
        <Route path='/sing-up' element={<Singup/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/about' element={<About />} />
        <Route path='/posts/:postSlug' element={<PostPage />} />

        <Route element={<PrivateRoute />} >
            <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        <Route element={<IsAdminPrivateRoute />} >
            <Route path='/create-post' element={<CreatePost/>} />
            <Route path='/update-post/:postId' element={<UpdatePost/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
