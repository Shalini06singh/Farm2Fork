import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserStart } from '../../redux/actions/user.action';

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginedUser = useSelector(state => state.user.loginedUser)
    // console.log(loginedUser);

    const logout = () => {
        dispatch(logoutUserStart())

        setTimeout(() => {
            navigate('/login')
        }, 1000);
    }

    return (
        <ul className="list-group">
            <li className="list-group-item active" aria-current="true">Sidebar</li>
            <li className="list-group-item">
                <Link to="/admin/profile">Profile</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/order">Order</Link>
            </li>
            {
                loginedUser.role === true && (
                    <>
                        <li className="list-group-item">
                            <Link to="/admin/product">Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/category">Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/user">User</Link>
                        </li>
                    </>
                )
            }

            <li className="list-group-item">
                <Link onClick={logout}>Logout</Link>
            </li>
        </ul>
    )
}
