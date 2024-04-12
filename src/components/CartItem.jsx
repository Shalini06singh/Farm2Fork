import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addCartStart, deleteCartStart, updateCartStart } from '../redux/actions/cart.action';

export default function CartItem({ item }) {
    console.log(item);
    const loginedUser = useSelector(state => state.user.loginedUser);
    const cartItem = useSelector(state => state.cart.cartItem);
    let [qty, setQty] = useState(parseInt(item.qty));
    const dispatch = useDispatch()

    const incrementQuantity = () => {
        setQty(qty + 1)

        let cart = {
            cartId: cartItem._id,
            productId: item.product._id,
            userId: loginedUser._id,
            qty: qty + 1
        }

        dispatch(updateCartStart(cart))
    }

    const decrementQuantity = () => {
        setQty(qty - 1)

        let cart = {
            cartId: cartItem._id,
            productId: item.product._id,
            userId: loginedUser._id,
            qty: qty - 1
        }

        if(cart.qty === 0) {
            dispatch(deleteCartStart(cart))
        }

        dispatch(updateCartStart(cart))
    }

    const removeItem = () => {
        let cart = {
            cartId: cartItem._id,
            productId: item.product._id,
            userId: loginedUser._id,
        }

        dispatch(deleteCartStart(cart))
    }

    useEffect(() => {
        setQty(parseInt(item.qty))
    }, [item.qty])

    return (
        <tr>
            <th>
                <div className="d-flex align-items-center">
                    <img src={process.env.REACT_APP_BACKEND_API_URL + item.product.image} className="img-fluid me-5 rounded-circle" style={{ width: "80px", height: "80px" }} alt={item.name} />
                </div>
            </th>
            <td>
                <p className="mb-0 mt-4">{item.product.name}</p>
            </td>
            <td>
                <p className="mb-0 mt-4">${item.product.price}</p>
            </td>
            <td>
                <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                    <div className="input-group-btn">
                        <button
                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                            onClick={decrementQuantity}>
                            <i className="fa fa-minus"></i>
                        </button>
                    </div>
                    <input
                        type="text"
                        className="form-control form-control-sm text-center border-0"
                        value={qty}
                        onChange={(event) => setQty(parseInt(event.target.value))}
                        readOnly
                    />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                            onClick={incrementQuantity}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <p className="mb-0 mt-4">${item.product.price * item.qty}</p>
            </td>
            <td>
                <button 
                    className="btn btn-md rounded-circle bg-light border mt-4" 
                    onClick={removeItem}>
                    <i className="fa fa-times text-danger"></i>
                </button>
            </td>
        </tr>
    )
}
