export const getCartFromApi = async () => {
    try {
        let currentUser = localStorage.getItem('loginedUser') ? JSON.parse(localStorage.getItem('loginedUser')) : null;

        let jwt = localStorage.getItem('jwt_token');

        if (currentUser) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/cart/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    "Authorization": `${jwt}`
                },
            })

            let result = await response.json();

            if (result.data?._id) {
                return result.data;
            } else {
                return {
                    customer: {},
                    items: [],
                    subTotal: 0,
                    tax: 0,
                    grandTotal: 0,
                    orderPlaced: false
                }
            }
        }

    } catch (error) {
        return {
            customer: {},
            items: [],
            subTotal: 0,
            tax: 0,
            grandTotal: 0,
            orderPlaced: false
        }
    }
}

export const addCartToApi = async (cartItemObject, userId) => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        if (userId) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/cart/add/${userId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${jwt}`
                },
                body: JSON.stringify(cartItemObject)
            })

            await response.json();
        }


    } catch (error) {
        throw new Error(`Error fetching user`);
    }
}

export const updateCartToApi = async (cart) => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        if (cart.userId) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/cart/update/${cart.userId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${jwt}`
                },
                body: JSON.stringify(cart)
            })

            await response.json();
        }

    } catch (error) {
        throw new Error(`Error fetching user`);
    }
}


export const deleteCartToApi = async (cart) => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        if (cart.userId) {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/cart/destroy/${cart.userId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${jwt}`
                },
                body: JSON.stringify(cart)
            })

            await response.json();
        }

    } catch (error) {
        throw new Error(`Error fetching user`);
    }
}