import PropTypes from 'prop-types'
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  toggle,
}) => {
  return (
    <div>
      <button
        style={{ display: toggle.loginVisible ? 'none' : '' }}
        onClick={() => toggle.setLoginVisible(!toggle.loginVisible)}
      >
        Log in
      </button>
      <div className='loginFormDiv' style={{ display: toggle.loginVisible ? '' : 'none' }}>
        <h2>Log in to application</h2>

        <form onSubmit={handleSubmit}>
          <div>
            Username
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button id="loginBtn" type="submit">login</button>
          <button
            type="button"
            onClick={() => toggle.setLoginVisible(!toggle.loginVisible)}
          >
            cancel
          </button>
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
