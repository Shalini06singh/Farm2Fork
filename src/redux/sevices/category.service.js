export const getCategoryFromApi = async () => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/category`, {
            headers: {
                "Authorization": `${jwt}`
            },
        })

        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching category`);
    }
}

export const addCategoryToApi = async (category) => {

    let jwt = localStorage.getItem('jwt_token');

    let formData = new FormData();

    for (const key in category) {
        formData.append(key, category[key])
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/category/store`, {
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

export const deleteCategoryToApi = async (category) => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/category/destroy/${category._id}`, {
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

export const updateCategoryToApi = async (category, id) => {
    let jwt = localStorage.getItem('jwt_token');

    let formData = new FormData();

    for (const key in category) {
        formData.append(key, category[key])
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/category/update/${id}`, {
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