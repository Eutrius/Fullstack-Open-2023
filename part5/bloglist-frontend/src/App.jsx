import { useState, useEffect, useCallback } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(true)

  const getAllBlogs = useCallback( async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(sortBlogs(allBlogs))
  }, [])

  useEffect(() => {
    getAllBlogs()
  }, [getAllBlogs])

  useEffect(() => {
    const loggedBloggerJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedBloggerJSON) {
      const user = JSON.parse(loggedBloggerJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
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
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Login successfull')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setUsername('')
      setPassword('')
      setErrorMessage('Invalid Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogger')
    setUser(null)
  }

  const handleCreateBlog = async (event, newBlog) => {
    event.preventDefault()

    try {
      const blog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      getAllBlogs()
      setSuccessMessage(`Successfully created ${blog.title}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    return
  }

  const handleLike = async (event, blog) => {
    try {
      const likedBlog = await blogService.addLike(blog)
      setBlogs(
        sortBlogs(
          blogs.map((blog) => {
            if (blog.id === likedBlog.id) {
              return { ...likedBlog, user: blog.user }
            } else {
              return blog
            }
          }),
        ),
      )
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = (event, blogToDelete) => {
    try {
      if (
        window.confirm(`Remove ${blogToDelete.title} by ${blogToDelete.author}`)
      ) {
        blogService.deleteBlog(blogToDelete.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
      </div>
      {!user && loginForm()}
      {user && (
        <div>
          Welcome, {user.name}
          <button onClick={handleLogout}>logout</button>
          <BlogForm handleSubmit={handleCreateBlog} />
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
