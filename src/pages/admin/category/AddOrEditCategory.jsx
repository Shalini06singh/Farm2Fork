import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryStart, updateCategoryStart } from '../../../redux/actions/category.action'

let initialState = {}

export default function AddOrEditCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const categories = useSelector(state => state.category.categories);
    let category;

    if (id) {
       category = categories.find(category => category._id === id)

        if (category) {
            initialState = category;
        } else {
            initialState = {
                name: '',
                image: '',
                status: '0'
            }
        }
    } else {
        initialState = {
            name: '',
            image: '',
            status: '0'
        }
    }

    let [formData, setFormData] = useState(initialState)

    let { name, image, status } = formData;

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submit = (event) => {
        event.preventDefault()

        if(id) {
            dispatch(updateCategoryStart(formData, id))
        }else {
            dispatch(addCategoryStart(formData));
        }

        setTimeout(() => {
            navigate('/admin/category')
        }, 2000)
    }

    const uploadFile = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            image: event.target.files[0]
        }))
    }

    useEffect(() => {
    
    }, [id])

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Add Category</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Add Category</li>
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
                                    <h4>{id ? 'Edit' : 'Add'} Category</h4>
                                    <Link to="/admin/category" className='btn btn-primary text-white'>Back</Link>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Category Name"
                                                value={name}
                                                name='name'
                                                onChange={inputChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="image"
                                                name='image'
                                                onChange={uploadFile} />
                                            {
                                                image && 
                                                <div className='mt-4'>
                                                    <img src={image} alt="" />
                                                </div>
                                            }
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select
                                                className='form-control'
                                                id='status'
                                                name='status'
                                                value={status}
                                                onChange={inputChange}>
                                                <option value="" hidden>Select Status</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>

                                        <div className='row'>
                                            <div className='col-sm-6 d-grid'>
                                                <button type='submit' className='btn btn-primary text-white'>Submit</button>
                                            </div>

                                            <div className='col-sm-6 d-grid'>
                                                <button type='reset' className='btn btn-primary text-white'>Reset</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
