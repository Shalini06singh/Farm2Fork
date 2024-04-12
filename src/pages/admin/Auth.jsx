import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PageNotFound from '../front/PageNotFound';
import { getUserStart } from '../../redux/actions/user.action';

export default function Auth() {
    const navigate = useNavigate();
    const loginedUser = useSelector(state => state.user.loginedUser)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserStart())


        if(! loginedUser._id) {
            setTimeout(() => {
                navigate('/login')
            }, 0);
        }
    }, [loginedUser])

    if(loginedUser.role == false) {
        if(
            location.pathname.includes("product")
            || location.pathname.includes("user")
            || location.pathname.includes("category")
        )
        return <PageNotFound />
    }

    return (
        <>
            <Outlet />
        </>

    )
}
