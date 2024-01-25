import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const url = `${baseUrl}/${blogId}`
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(url, config)
  return response.data
}

const addLike = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const data = {
    likes: blog.likes + 1,
    user: blog.user.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
  }
  const response = await axios.put(url, data)
  return response.data
}

export default { getAll, createBlog, setToken, addLike, deleteBlog }
