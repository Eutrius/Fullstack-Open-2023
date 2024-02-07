import { createSlice } from "@reduxjs/toolkit";
import BlogsService from "../services/blogs"
import { setNotification } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers : {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state,action) {
      state.push(action.payload)
    },
    updateBlog(state,action) {
      const updatedBlog = action.payload
      return state.map((blog) => updatedBlog.id === blog.id ? updatedBlog : blog  )
    },
    removeBlog(state,action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    appendComment(state,action) {
      const comment = action.payload
      return state.map((blog) => blog.id === comment.blog ? {...blog, comments: [...blog.comments, comment]} : blog)
    }
  }
})

export const {setBlogs, appendBlog, updateBlog, removeBlog, appendComment} = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await BlogsService.getAll();
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await BlogsService.createBlog(blog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`Blog "${newBlog.title}" created.`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error)) 
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await BlogsService.addLike(blog)
    dispatch(updateBlog(likedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
      if (
        window.confirm(`Remove ${blog.title} by ${blog.author}`)
      ) {
        BlogsService.deleteBlog(blog.id);
        dispatch(removeBlog(blog.id))
      }
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    try {
      const newComment = await BlogsService.createComment(id, comment)
      dispatch(appendComment(newComment))
      dispatch(setNotification(`Comment added.`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error)) 
    }
  }
}

export default blogsSlice.reducer
