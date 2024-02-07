import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Route, Routes} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { getCurrentUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getCurrentUser())
  }, [])

  return (
    <div className='container'>
      <Menu />
      <h1>Blogs</h1>
      <Notification />
        <Routes>
          <Route path='/' element={<BlogList/>} />
          <Route path='/users' element={<UserList />} />
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='*' element={<Navigate to="/"/>} />
        </Routes>
    </div>
  )
}

export default App
