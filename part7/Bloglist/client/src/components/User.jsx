import { useSelector } from "react-redux"
import { Link, Navigate, useParams } from "react-router-dom"

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find((user) => user.id === String(id))

  
  if (!user) {
    return <Navigate to="/"/>
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>{user.blogs.length === 0 ? "No " : ""}added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
          )
        )}
      </ul>
    </div>
  )
}

export default User
