import React from 'react'
import { Link } from 'react-router-dom'

export default function Thank() {
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Thank you</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Thank you</li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className='text-center'>Thank you for purchasing product with us</h1>
                </div>
            </div>
        </>
    )
}
