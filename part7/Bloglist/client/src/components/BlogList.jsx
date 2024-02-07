import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import BlogForm from "./BlogFrom"
import { Table } from "react-bootstrap"

const BlogList = () => {
  const user = useSelector(state => state.user)
  
  const sortblogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }
  let blogs = useSelector(state => state.blogs)
  

  blogs = sortblogs(JSON.parse(JSON.stringify(blogs)))

  return (
      <div id='blogList'>
      {user && <BlogForm/>}
      <Table striped>
        <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>
              {blog.author}
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      </div>
  )
}

export default BlogList
