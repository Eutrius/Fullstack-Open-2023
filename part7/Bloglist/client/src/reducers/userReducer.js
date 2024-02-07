import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state,action) {
      return action.payload
    },
    removeUser(state,action) {
      return null
    }
  }
})

export const {setUser, removeUser} = userSlice.actions

export const getCurrentUser = () => {
  return dispatch => {
    const currentUserJSON = window.localStorage.getItem('loggedBlogger')
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification("Login successfull"))
    } catch (error) {
      dispatch(setNotification("Invalid Username or Password"))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogger')
    dispatch(removeUser())
  }
}


export default userSlice.reducer
