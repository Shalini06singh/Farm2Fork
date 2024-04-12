import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { placeOrderStart } from '../../redux/actions/order.action';
import Stripe from 'react-stripe-checkout'

export default function Checkout() {
    const cartItem = useSelector(state => state.cart.cartItem);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    let [payment, setPayment] = useState('delivery')

    let initialState = {
        cartId: cartItem._id,
        name: cartItem.user.name,
        email: cartItem.user.email,
        contactNumber: cartItem.user.contactNumber,
        address: cartItem.user.address,
        city: cartItem.user.city,
        state: cartItem.user.state,
        country: cartItem.user.country,
        zipCode: cartItem.user.zipCode
    }

    const [formData, setFormData] = useState(initialState);

    let { name, email, contactNumber, address, city, state, country, zipCode } = formData;

    useEffect(() => {

    }, [cartItem.items.length, cartItem.user._id])

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const paymentChange = (event) => {
        setPayment(event.target.value);
    }

    const submit = () => {
        // console.log(formData);
        dispatch(placeOrderStart(formData))

        setTimeout(() => {
            navigate('/thank-you')
        },100)
    }


    const handleToken = (totalAmount, token) => {
        try {
            fetch(`${process.env.REACT_APP_BACKEND_API_URL}/stripe/pay`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    amount: totalAmount
                })
            })

            submit();

        } catch (error) {
            console.log(error);
        }
    }

    const tokenHandler = (token) => {
        handleToken(parseFloat(cartItem.grandTotal), token)
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Checkout</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Checkout</li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Billing details</h1>

                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Name<sup>*</sup></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={inputChange} />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item">
                                        <label className="form-label my-3">Email Address<sup>*</sup></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name='email'
                                            value={email}
                                            onChange={inputChange} />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Address <sup>*</sup></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="House Number Street Name"
                                            name='address'
                                            value={address}
                                            onChange={inputChange} />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item">
                                        <label className="form-label my-3">Town/City<sup>*</sup></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='city'
                                            value={city}
                                            onChange={inputChange} />
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item">
                                        <label className="form-label my-3">State<sup>*</sup></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='state'
                                            value={state}
                                            onChange={inputChange} />
                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item">
                                        <label className="form-label my-3">Country<sup>*</sup></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='country'
                                            value={country}
                                            onChange={inputChange} />
                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item">
                                        <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='zipCode'
                                            value={zipCode}
                                            onChange={inputChange} />
                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item">
                                        <label className="form-label my-3">Mobile<sup>*</sup></label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name='contactNumber'
                                            value={contactNumber}
                                            onChange={inputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Products</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItem.items.length > 0 && cartItem.items.map((item, i) => (
                                                <tr key={i}>
                                                    <th>
                                                        <div className="d-flex align-items-center mt-2">
                                                            <img src={process.env.REACT_APP_BACKEND_API_URL + item.product.image} className="img-fluid rounded-circle" style={{ width: "90px", height: "90px" }} alt="" />
                                                        </div>
                                                    </th>
                                                    <td className="py-5">{item.product.name}</td>
                                                    <td className="py-5">${item.product.price}</td>
                                                    <td className="py-5">{item.qty}</td>
                                                    <td className="py-5">${item.product.price * item.qty}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${cartItem.subTotal}</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-3">Tax</p>
                                            </td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${cartItem.tax}</p>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">${cartItem.grandTotal}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" name='payment' className="form-check-input bg-primary border-0" id="Delivery-1" value="delivery" onChange={paymentChange} />
                                        <label className="form-check-label" htmlFor="Delivery-1">Cash On Delivery</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="radio" name='payment' className="form-check-input bg-primary border-0" id="Paypal-1" value="stripe" onChange={paymentChange} />
                                        <label className="form-check-label" htmlFor="Paypal-1">Stripe</label>
                                    </div>
                                </div>
                            </div>
                            <div className='payment d-flex flex-wrap justify-content-end'>
                                <div className="payment-button text-center">
                                    {
                                        payment === 'stripe' &&
                                        <Stripe stripeKey='pk_test_51HqyueDS0O4mepKZvRFaIVN7eKLKUXyiRvl62lnoIo5zoSrYmfUPMJLFJeuA9r87vKicVEz20QZrVZTgJtH57ZOM00M7xl715D' token={tokenHandler} />
                                    }
                                </div>
                                <button type="button" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary" onClick={submit}>Place Order</button>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
