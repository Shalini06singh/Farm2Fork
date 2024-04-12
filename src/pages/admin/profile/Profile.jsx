import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useSelector } from 'react-redux'

export default function Profile() {
    const loginedUser = useSelector(state => state.user.loginedUser)

    useEffect(() => {

    }, [loginedUser])

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Profile</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Profile</li>
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
                                    <h4>Profile</h4>
                                    <Link to="/admin/profile/edit" className='btn btn-primary text-white'>Edit Profile</Link>
                                </div>
                                <div className="card-body">
                                    <p className='profile-data'>
                                        <span className='title'>Name</span>
                                        <span className='data'>{loginedUser.name}</span>
                                    </p>
                                    
                                    <p className='profile-data'>
                                        <span className='title'>Email</span>
                                        <span className='data'>{loginedUser.email}</span>
                                    </p>

                                    <p className='profile-data'>
                                        <span className='title'>Image</span>
                                        <span className='data'>
                                            <img src={process.env.REACT_APP_BACKEND_API_URL + loginedUser.image} alt="" />
                                        </span>
                                    </p>

                                    <p className='profile-data'>
                                        <span className='title'>Contact Number</span>
                                        <span className='data'>{loginedUser.contactNumber}</span>
                                    </p>

                                    <p className='profile-data'>
                                        <span className='title'>Address</span>
                                        <span className='data'>{
                                            `
                                             ${loginedUser.contactNumber ?? ''} ${loginedUser.address ?? ''} ${
                                                loginedUser.city ?? ''} ${loginedUser.state ?? ''} ${loginedUser.country ?? ''} ${loginedUser.zipCode ?? ''}
                                            `                                             
                                        }</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
