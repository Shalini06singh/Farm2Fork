import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductStart, getProductStart } from '../../../redux/actions/product.action';

export default function Products() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    dispatch(getProductStart())
  }, [products.length])

  const deleteProduct = (product) => {
    dispatch(deleteProductStart(product))
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Product</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Product</li>
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
                  <h4>Product</h4>
                  <Link to="/admin/product/create" className='btn btn-primary text-white'>Add Product</Link>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Short description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.length > 0 && products.map((product, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td><img src={process.env.REACT_APP_BACKEND_API_URL + product.image} alt="" /></td>
                            <td>{product.name}</td>

                            <td>{product.shortDescription}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.status === true ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Link to={`/admin/product/edit/${product._id}`} className='btn btn-warning'>
                                Edit
                              </Link>
                              <button
                                className='btn btn-danger mx-2'
                                onClick={() => deleteProduct(product)}
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
