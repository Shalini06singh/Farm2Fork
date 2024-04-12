import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCartHelper } from '../../helpers/cart.helper';
import { addCartStart } from '../../redux/actions/cart.action';

export default function ShopDetails() {
    let categories = useSelector(state => state.category.categories)
    let products = useSelector(state => state.product.products)
    const loginedUser = useSelector(state => state.user.loginedUser);
    const cartItem = useSelector(state => state.cart.cartItem);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);

    const { id } = useParams();

    const getProductById = () => {
        const prod = products.find(p => p.id === id);

        if (product) {
            setProduct(prod);
        } else {
            navigate('/')
        }
    }

    const incrementQuantity = () => {
        setQty(qty + 1)
    }

    const decrementQuantity = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    const inputChange = (event) => {
        if (event.target.value) {
            setQty(parseInt(event.target.value))
        } else {
            setQty(0)
        }
    }

    useEffect(() => {
        if (!id) {
            navigate('/')
        }

        getProductById();
    }, [id])

    const addToCart = () => {
        if (!loginedUser.name) {
            navigate('/login')
        }

        let updatedCartResponse = addToCartHelper(cartItem, product, loginedUser);
        dispatch(addCartStart(updatedCartResponse));
    }

    return (
        <>

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">{product.name}</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">{product.name}</li>
                </ol>
            </div>

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <Link>
                                            <img
                                                src={product.image}
                                                className="img-fluid rounded"
                                                alt={product.name}
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                }} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{product.name}</h4>
                                    <p className="mb-3">Category: {product.category}</p>
                                    <h5 className="fw-bold mb-3">${product.price}</h5>
                                    <p className="mb-4">{product.shortDescription}</p>
                                    <div className="input-group quantity mb-5" style={{
                                        width: "100px"
                                    }}>
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
                                            onChange={inputChange} />
                                        <div className="input-group-btn">
                                            <button
                                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                onClick={incrementQuantity}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                        onClick={addToCart}>
                                        <i className="fa fa-shopping-bag me-2 text-primary"></i>
                                        Add to cart
                                    </button>
                                </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                                aria-controls="nav-about" aria-selected="true">Description</button>

                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            {product.description}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">

                                    <div className="mb-4">
                                        <h4>Categories</h4>
                                        <ul className="list-unstyled fruite-categorie">
                                            {
                                                categories.length > 0 && categories.map((category, index) => (
                                                    <li key={index}>
                                                        <div className="d-flex justify-content-between fruite-name">
                                                            <Link>{category.name}</Link>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
