import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserStart, getUserStart } from '../../../redux/actions/user.action'

export default function Users() {
  const users = useSelector(state => state.user.users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserStart())
  }, [users.length])

  const deleteUser = (user) => {
    dispatch(deleteUserStart(user))
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">User</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">User</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className='row'>
            <div className="col-sm-3">
              <Sidebar />
            </div>
            <div className='col-sm-9'>
              <div className="card">
                <div className='card-header d-flex justify-content-between'>
                  <h4>User</h4>
                  <Link to="/admin/user/create" className='btn btn-primary text-white'>Add User</Link>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.length > 0 && users.map((user, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td><img src={process.env.REACT_APP_BACKEND_API_URL + user.image} /></td>
                            <td>{user.name}</td>

                            <td>{user.email}</td>
                            <td>{user.role == true ? 'Admin' : 'Customer'}</td>
                            <td>{user.status == true ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Link to={`/admin/user/edit/${user._id}`} className='btn btn-warning'>
                                Edit
                              </Link>
                              <button
                                className='btn btn-danger mx-2'
                                onClick={() => deleteUser(user)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
