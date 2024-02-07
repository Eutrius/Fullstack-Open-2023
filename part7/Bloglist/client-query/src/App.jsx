import { useState, useEffect, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'
import { useNotificationDispatch } from './contexts/NotificationContext'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './contexts/UserContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(true)
  const dispatchNotification = useNotificationDispatch();
  const queryClient = useQueryClient()
  const [user, userDispatch] = useContext(UserContext)

  const likeBlogMutation = useMutation({
    mutationFn: blogService.addLike,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.map((blog) => blog.id === likedBlog.id ? likedBlog : blog))
    },
    onError: (error) => {
      dispatchNotification({type:"SET_MESSAGE", payload: error.response.data.error})
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.filter((blog) => blog.id !== id))
    },
    onError: (error) => {
      dispatchNotification({type:"SET_MESSAGE", payload: error.response.data.error})
    }
  })

  useEffect(() => {
    const loggedBloggerJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedBloggerJSON) {
      const user = JSON.parse(loggedBloggerJSON)
      userDispatch({type: "SET_USER", payload: user})
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 2
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = sortBlogs(result.data)

  const handleLike = async (event, blog) => {
    likeBlogMutation.mutate(blog)
  }

  const handleDelete = (event, blogToDelete) => {
    if (
      window.confirm(`Remove ${blogToDelete.title} by ${blogToDelete.author}`)
    ) {
      deleteBlogMutation.mutate(blogToDelete.id)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({type: "SET_USER", payload: user})
      dispatchNotification({type:"SET_MESSAGE", payload: "Login successfull"})
    } catch (error) {
      dispatchNotification({type:"SET_MESSAGE", payload: "Invalid Username or Password"})
    } finally {
      setUsername('')
      setPassword('')
    }
    
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogger')
    userDispatch({type: "REMOVE_USER"})
  }

  const loginForm = () => {
    return (
      <LoginForm
        toggle={{ loginVisible, setLoginVisible }}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <Notification />
      </div>

      {!user && loginForm()}
      {user && (
        <div>
          Welcome, {user.name}
          <button onClick={handleLogout}>logout</button>
          <BlogForm />
        </div>
      )}
      <div id='blogList'>
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              username={user ? user.username : ''}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
