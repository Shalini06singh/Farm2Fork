import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useSelector } from 'react-redux';

export default function ViewOrder() {
  const orders = useSelector(state => state.order.orders);

  let {id} = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});

  useEffect(() => {
    let findOrder = orders.find(ord => ord._id === id);

    if(findOrder) {
      setOrder(findOrder);
    }else {
      navigate('/admin/order')
    }
  }, [order?.id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Order View</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Order View</li>
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
                  <h4>Order #{order?.id}</h4>
                  <Link to="/admin/order" className='btn btn-primary text-white'>Back</Link>
                </div>
                <div className="card-body">

                  <ul className="list-group mb-2">
                    <li className="list-group-item active" aria-current="true">Order Summary</li>
                    <li className="list-group-item">Sub total : ${order?.subTotal}</li>
                    <li className="list-group-item">Tax : ${order?.tax}</li>
                    <li className="list-group-item">Grand total : ${order?.grandTotal}</li>
                  </ul>

                  <ul className="list-group mb-2">
                    <li className="list-group-item active" aria-current="true">Billing address</li>
                    <li className="list-group-item">Customer Name : {order?.address?.name}</li>
                    <li className="list-group-item">Customer Email: {order?.address?.email}</li>
                    <li className="list-group-item">Customer Address: {order?.address?.address}</li>
                    <li className="list-group-item">Customer City: {order?.address?.city}</li>
                    <li className="list-group-item">Customer State: {order?.address?.state}</li>
                    <li className="list-group-item">Customer Country: {order?.address?.country}</li>
                    <li className="list-group-item">Customer pincode: {order?.address?.zipCode}</li>
                    <li className="list-group-item">Customer Contact Number: {order?.address?.contactNumber}</li>                    
                  </ul>

                  <ul className="list-group mb-2">
                    <li className="list-group-item active" aria-current="true">Products</li>
                    <li className="list-group-item">
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
                          </tr>
                        </thead>
                        <tbody>
                           {
                             order?.items?.length > 0 && order?.items.map((item, index) => (
                               <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td><img src={process.env.REACT_APP_BACKEND_API_URL +  item.product.image} alt="" /></td>
                                  <td>{item.product.name}</td>
                                  <td>{item.product.shortDescription}</td>
                                  <td>{item.product.price}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.product.status ? 'Active' : 'Inactive'}</td>
                               </tr>
                             ))
                           }
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
