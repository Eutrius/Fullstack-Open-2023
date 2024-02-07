import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Comments from './Comments';
const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  const blog = blogs.find((blog) => blog.id === String(id))
  
  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = (blog) => {
      dispatch(deleteBlog(blog))
      navigate("/")
  }

  const toShowDelete = () => {
    if (user && user.username === blog.user.username) {
      return true;
    }
    return false
  }

  if (!blog) {
    return <Navigate to="/"/>
  }

  return (
    <div className='titleAuthorDiv'>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a target='_blank' href={blog.url}>{blog.url}</a>
      <br/>
      <p>{blog.likes} likes 
      <Button variant='secondary' className='likeButton' type="button" onClick={() => handleLike(blog)}>
          like
      </Button>
      </p>
      <p>added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></p>
      <Button
          variant='danger'
          type="button"
          id='deleteBtn'
          style={{ display: toShowDelete() ? '' : 'none' }}
          onClick={() => handleDelete(blog)}
        >
          delete
      </Button>
      <Comments user={user} comments={blog.comments} />
    </div>
  )
}

export default Blog
