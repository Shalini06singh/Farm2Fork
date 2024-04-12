export const getOrderFromApi = async () => {
    try {
        let jwt = localStorage.getItem('jwt_token');

        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/admin/order`, {
            method: "POST",
            headers: {
                "Authorization": `${jwt}`
            },
        })

        return  await response.json();

    } catch (error) {
        throw new Error(`Error fetching category`);
    }
}

export const placeOrderToApi = async (order) => {
  
    try {
        let jwt = localStorage.getItem('jwt_token');
        let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/checkout/${order.cartId}`, {
            
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${jwt}`
            },
            body: JSON.stringify(order)
        })

        await response.json();



    } catch (error) {
        throw new Error(`Error fetching user`);
    }

}