import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/userReducer";
import { Navbar, Nav, Button } from "react-bootstrap";

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const padding = {
    paddingRight : 5,
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <em style={padding}>{user.name} logged in <Button onClick={handleLogout} variant="secondary">Logout</Button></em>
              : <Link style={padding} to="/login">login</Link>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
