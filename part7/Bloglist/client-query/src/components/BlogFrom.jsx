import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from "../services/blogs"

const BlogFrom = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))
      dispatchNotification({type:"SET_MESSAGE", payload: `Successfully created ${newBlog.title}`})
    },
    onError: (error) => {
      dispatchNotification({type:"SET_MESSAGE", payload: error.response.data.error})
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({title,author,url})
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <button
        style={{ display: showForm ? 'none' : '' }}
        onClick={() => setShowForm(!showForm)}
      >
        Create Blog
      </button>
      <div style={{ display: showForm ? '' : 'none' }}>
        <h2>Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Title
            <input
              type="text"
              name="title"
              id='title'
              value={title}
              placeholder='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              name="author"
              id='author'
              value={author}
              placeholder='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url
            <input
              type="text"
              name="url"
              id='url'
              value={url}
              placeholder='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id='createBtn' type="submit">create</button>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogFrom
