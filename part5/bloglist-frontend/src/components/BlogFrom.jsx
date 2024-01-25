import { useState } from 'react'
const BlogFrom = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

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
        <form
          onSubmit={(event) => {
            setTitle('')
            setAuthor('')
            setUrl('')
            handleSubmit(event, { title, author, url })
          }}
        >
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
