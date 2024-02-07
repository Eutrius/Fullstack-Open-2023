import { useState } from 'react'
const Blog = ({ blog, handleLike, username, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleClickView = () => {
    setShowDetails(!showDetails)
  }
  return (
    <div className='titleAuthorDiv'>
      {blog.title} {blog.author}
      <button className='toggleButton' type="button" onClick={handleClickView}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div className='urlLikesDiv' style={{ display: showDetails ? '' : 'none' }}>
        {blog.url} <br /> likes {blog.likes}{' '}
        <button className='likeButton' type="button" onClick={(event) => handleLike(event, blog)}>
          like
        </button>{' '}
        <br /> {blog.user.name} <br />
        <button
          type="button"
          id='deleteBtn'
          style={{ display: blog.user.username === username ? '' : 'none' }}
          onClick={(event) => handleDelete(event, blog)}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default Blog
