import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { profileEditUserStart } from '../../../redux/actions/user.action';

export default function ProfileEdit() {
  const loginedUser = useSelector(state => state.user.loginedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  let currentUser = {...loginedUser};

  delete currentUser.password

  const [formData, setFormData] = useState(currentUser)

  let {
    name, email, contactNumber = '', image = '', address = '', city = '', state = '', country = '', zipCode = ''
  } = formData

  const inputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const uploadFile = (event) => {
    setFormData((prevState) => ({
      ...prevState,
       image: event.target.files[0]
    }))
  }

  const submit = async (event) => {
    event.preventDefault()

    dispatch(profileEditUserStart(formData, formData._id))

    setTimeout(() => {
      navigate('/admin/profile')
    }, 2000)
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Add User</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Add User</li>
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
                  <h4>Edit Profile</h4>
                  <Link to="/admin/profile" className='btn btn-primary text-white'>Back</Link>
                </div>
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        name='name'
                        value={name}
                        onChange={inputChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        name='email'
                        value={email}
                        onChange={inputChange}
                        readOnly />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="contactNumber"
                        placeholder="contactNumber"
                        name='contactNumber'
                        value={contactNumber}
                        onChange={inputChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name='image'
                        onChange={uploadFile}
                      />
                      <div className='mt-2'>
                        <img src={image} alt="" />
                      </div>

                    </div>

                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="address"
                        name='address'
                        value={address}
                        onChange={inputChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="city"
                        name='city'
                        value={city}
                        onChange={inputChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="state"
                        name='state'
                        value={state}
                        onChange={inputChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="country"
                        name='country'
                        value={country}
                        onChange={inputChange} />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="zipCode" className="form-label">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        placeholder="zipCode"
                        name='zipCode'
                        value={zipCode}
                        onChange={inputChange} />
                    </div>

                    <div className='row'>
                      <div className='col-sm-6 d-grid'>
                        <button type='submit' className='btn btn-primary text-white'>Submit</button>
                      </div>

                      <div className='col-sm-6 d-grid'>
                        <button type='reset' className='btn btn-primary text-white'>Reset</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
