import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Button, Form } from 'react-bootstrap'

const BlogFrom = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch();

  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url}))
    resetForm()
  }

  return (
    <div className='w-25 mb-3'>
      <Button variant="light"
        style={{ display: showForm ? 'none' : '' }}
        onClick={() => setShowForm(!showForm)}
      >
        Create Blog
      </Button>
      <div style={{ display: showForm ? '' : 'none' }}>
        <h2>Create Blog</h2>
        <Form onSubmit={handleCreateBlog}>
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              id='title'
              value={title}
              placeholder='Title'
              onChange={({ target }) => setTitle(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="author">Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              id='author'
              value={author}
              placeholder='Author'
              onChange={({ target }) => setAuthor(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="url">Url</Form.Label>
            <Form.Control
              type="text"
              name="url"
              id='url'
              value={url}
              placeholder='Url'
              onChange={({ target }) => setUrl(target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='mt-2 me-2' variant='primary' id='createBtn' type="submit">Create</Button>
          <Button className='mt-2' variant='danger' type="button" onClick={() => setShowForm(!showForm)}>
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default BlogFrom
