import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addToCartHelper } from '../helpers/cart.helper';
import { addCartStart } from '../redux/actions/cart.action';

export default function ProductItem({product, size}) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loginedUser = useSelector(state => state.user.loginedUser);
    let categories = useSelector(state => state.category.categories)

    const getCategory = (catId) => {
        let category = categories.find(cat => cat._id === catId)

        if(category) {
            return category.name
        }
    }

    const addToCart = () => {
        if(! loginedUser.name) {
            navigate('/login')
        }

        let cartItemObject = {
            productId: product._id,
            qty: 1
        }

        dispatch(addCartStart(cartItemObject, loginedUser._id));
    } 

    return (
        <div className={`col-md-6 col-lg-4 col-xl-${size}`}>
           
            <div className="rounded position-relative fruite-item">
                <div className="fruite-img">
                    <img src={process.env.REACT_APP_BACKEND_API_URL + product.image} className="img-fluid w-100 rounded-top" alt="" />
                </div>
                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{
                    top: "10px", left: "10px"
                }}>
                    {getCategory(product.category)}        
                </div>
                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                    <Link to={`/shop-details/${product.id}`}><h4>{product.name}</h4></Link>
                    <p>{product.shortDescription}</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                        <button 
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                            onClick={addToCart}>
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> 
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
