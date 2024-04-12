export const getUserFromApi = async () => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/user`, {
            headers: {
                "Authorization": `${jwt}`
            },
        })

        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching user`);
    }
}

export const addUserToApi = async (user) => {

    let jwt = localStorage.getItem('jwt_token');

    let formData = new FormData();

    for (const key in user) {
        formData.append(key, user[key])
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/user/store`, {
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

export const deleteUserToApi = async (user) => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/user/destroy/${user._id}`, {
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
export const updateUserToApi = async (user, id) => {

    let jwt = localStorage.getItem('jwt_token');

    let formData = new FormData();

    for (const key in user) {
        formData.append(key, user[key])
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/user/update/${id}`, {
            headers: {
                "Authorization":   `${jwt}`
            },
            method: 'POST',
            body: formData       
        })

        return await response.json();

    } catch (error) {
        throw new Error('Something went wrong');
    }
}