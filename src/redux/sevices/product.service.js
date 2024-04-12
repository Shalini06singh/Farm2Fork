export const getProductFromApi = async () => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/product`, {
            headers: {
                "Authorization": `${jwt}`
            },
        })

        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching category`);
    }
}

export const addProductToApi = async (product) => {
    let jwt = localStorage.getItem('jwt_token');

    let formData = new FormData();

    for (const key in product) {
        formData.append(key, product[key])
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/product/store`, {
            headers: {
                "Authorization": `${jwt}`
            },
            method: 'POST',
            body: formData
        })

        return await response.json();

    } catch (error) {
        throw new Error('Something went wrong');
    }
}

export const deleteProductToApi = async (product) => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/product/destroy/${product._id}`, {
            headers: {
                "Authorization": `${jwt}`
            },
            method: "DELETE"
        })

        return await response.json();
    } catch (error) {
        throw new Error('Something went wrong');
    }
}

export const updateProductToApi = async (product, id) => {
    let jwt = localStorage.getItem('jwt_token');

    let formData = new FormData();

    for (const key in product) {
        formData.append(key, product[key])
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/product/update/${id}`, {
            headers: {
                "Authorization": `${jwt}`
            },
            method: 'POST',
            body: formData
        })

        return await response.json();

    } catch (error) {
        throw new Error('Something went wrong');
    }
}