import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  
  const users = useSelector(state => state.users)
  return (
  <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>{users.length === 0 ? "No " : ""}blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
            <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}


export default UserList;
