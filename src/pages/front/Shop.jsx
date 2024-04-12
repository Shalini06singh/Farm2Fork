import React from 'react'
import { Link } from 'react-router-dom'
import ProductItem from '../../components/ProductItem'
import { useSelector } from 'react-redux'

export default function Shop() {
    let categories = useSelector(state => state.category.categories)
    let products = useSelector(state => state.product.products)

    return (
        <>

            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Shop</h1>
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>

            <div class="container-fluid fruite py-5">
                <div class="container py-5">
                    <h1 class="mb-4">Fresh fruits shop</h1>
                    <div class="row g-4">
                        <div class="col-lg-12">
                            <div class="row g-4">
                                <div class="col-lg-3">
                                    <div class="row g-4">
                                        <div class="col-lg-12">
                                            <div class="mb-3">
                                                <h4>Categories</h4>
                                                <ul class="list-unstyled fruite-categorie">
                                                    {
                                                        categories.length > 0 && categories.map((category, index) => (
                                                            <li>
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
                                <div class="col-lg-9">
                                    <div class="row">
                                        {
                                            products.length > 0 && products.map((product, index) => (
                                                <ProductItem product={product} key={index} size="4" />
                                            ))
                                        }
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
