import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getCartStart } from '../redux/actions/cart.action';

export default function Header() {
    const loginedUser = useSelector(state => state.user.loginedUser)
    const cartItem = useSelector(state => state.cart.cartItem);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartStart())
    }, [loginedUser, cartItem?.items?.length])

    return (
        <>
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">Hazrat Ganj, Lucknow</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">Farm2Fork@gmail.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            {/* <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a> */}
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">Farm2Fork</h1></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                                {
                                    !loginedUser.name && <>
                                        <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
                                        <NavLink to="/login" className="nav-item nav-link">Login</NavLink>      
                                    </>
                                }
                                
                            </div>
                            <div className="d-flex m-3 me-0">
                                {
                                    loginedUser.name && <>
                                        <Link to="/cart" className="position-relative me-4 my-auto">
                                            <i className="fa fa-shopping-bag fa-2x"></i>
                                            {
                                                cartItem.items?.length > 0 && 
                                                <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{
                                                    top: "-5px", left: "15px", height: "20px", minWidth: "20px"
                                                }}>{cartItem.items?.length}</span>
                                            }
                                        </Link>
                                        <Link to="/admin/profile" className="my-auto">
                                            <i className="fas fa-user fa-2x"></i>
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
