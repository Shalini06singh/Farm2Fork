import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, updateProductStart } from '../../../redux/actions/product.action';

let initialState = {}

export default function AddOrEditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let categories = useSelector(state => state.category.categories);
  let products = useSelector(state => state.product.products);

  categories = categories.filter(category => category.status === true)

  if (id) {
    let product = products.find(product => product._id === id)

    if (product) {
      initialState = product;
    } else {
      initialState = {
        name: '',
        slug: '',
        image: '',
        shortDescription: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        status: '0',
      }
    }
  } else {
    initialState = {
      name: '',
      slug: '',
      image: '',
      shortDescription: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      status: '0',
    }
  }

  const [formData, setFormData] = useState(initialState)


  let {
    name, slug, image, shortDescription, description, price, quantity, category, status
  } = formData

  const inputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const submit = (event) => {
    event.preventDefault()

    if (id) {
      dispatch(updateProductStart(formData, id))
    } else {
      dispatch(addProductStart(formData))
    }

    setTimeout(() => {
      navigate('/admin/product')
    }, 1000)
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
                  <h4>Add Product</h4>
                  <Link to="/admin/product" className='btn btn-primary text-white'>Back</Link>
                </div>
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        name='name'
                        value={name}
                        onChange={inputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        id="slug"
                        placeholder="Slug"
                        name='slug'
                        value={slug}
                        onChange={inputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name='image'
                        onChange={uploadFile}
                      />

                      <div className='mt-2'>
                        <img src={image} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="shortDescription" className="form-label">Short Description</label>
                      <textarea
                        className='form-control'
                        name="shortDescription"
                        id="shortDescription"
                        rows="5"
                        defaultValue={shortDescription}
                        onChange={inputChange}></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        className='form-control'
                        name="description"
                        id="description"
                        rows="10"
                        defaultValue={description}
                        onChange={inputChange}></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="price"
                        name='price'
                        step="any"
                        min="0"
                        value={price}
                        onChange={inputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        placeholder="quantity"
                        name='quantity'
                        min="1"
                        value={quantity}
                        onChange={inputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">category</label>
                      <select
                        className='form-control'
                        id='category'
                        name='category'
                        defaultValue={category}
                        onChange={inputChange}
                      >
                        <option value="" hidden>Select Category</option>
                        {
                          categories.length > 0 && categories.map((category, index) => (
                            <option value={category._id} key={index}>{category.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select
                        className='form-control'
                        id='status'
                        name='status'
                        defaultValue={status}
                        onChange={inputChange}
                      >
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
