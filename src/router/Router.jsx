import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/front/Home'
import Shop from '../pages/front/Shop'
import ShopDetails from '../pages/front/ShopDetails'
import Cart from '../pages/front/Cart'
import Checkout from '../pages/front/Checkout'
import Thank from '../pages/front/Thank'
import Register from '../pages/authentication/Register'
import Login from '../pages/authentication/Login'
import Auth from '../pages/admin/Auth'
import Profile from '../pages/admin/profile/Profile'
import ProfileEdit from '../pages/admin/profile/ProfileEdit'
import Products from '../pages/admin/product/Products'
import AddOrEditProduct from '../pages/admin/product/AddOrEditProduct'
import Categories from '../pages/admin/category/Categories'
import AddOrEditCategory from '../pages/admin/category/AddOrEditCategory'
import Orders from '../pages/admin/order/Orders'
import ViewOrder from '../pages/admin/order/ViewOrder'
import Users from '../pages/admin/user/Users'
import AddOrEditUser from '../pages/admin/user/AddOrEditUser'
import PageNotFound from '../pages/front/PageNotFound'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/shop-details/:id' element={<ShopDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/thank-you' element={<Thank />} />

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/admin' element={<Auth />}>

        <Route path="profile">
          <Route path='' element={<Profile />} />
          <Route path='edit' element={<ProfileEdit />} />
        </Route>

        <Route path="product">
          <Route path='' element={<Products />} />
          <Route path='create' element={<AddOrEditProduct />} />
          <Route path='edit/:id' element={<AddOrEditProduct />} />
        </Route>

        <Route path="category">
          <Route path='' element={<Categories />} />
          <Route path='create' element={<AddOrEditCategory />} />
          <Route path='edit/:id' element={<AddOrEditCategory />} />
        </Route>

        <Route path="order">
          <Route path='' element={<Orders />} />
          <Route path='view/:id' element={<ViewOrder />} />
        </Route>

        <Route path="user">
          <Route path='' element={<Users />} />
          <Route path='create' element={<AddOrEditUser />} />
          <Route path='edit/:id' element={<AddOrEditUser />} />
        </Route>
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}
