import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const user = { username, password }
    setUsername('')
    setPassword('')
    dispatch(loginUser(user))
  }

  
  return (
      <div className='loginFormDiv w-25'>
        <h2>Log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control 
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control 
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button className='mt-2' variant='primary' id="loginBtn" type="submit">login</Button>
        </Form>
      </div>
  )
}

export default LoginForm
