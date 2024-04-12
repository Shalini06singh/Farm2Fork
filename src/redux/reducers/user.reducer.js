import { GET_USER_SUCCESS, LOGINED_USER_SUCCESS, LOGOUT_USER_SUCCESS, PROFILE_EDT_USER_SUCCESS } from "../constants/user.constant";

const initialState = {
    users: localStorage.getItem('users') ? JSON.parse(
                    localStorage.getItem('users')
                ) : [],
    loginedUser:  localStorage.getItem('loginedUser') ? JSON.parse(
        localStorage.getItem('loginedUser')
    ) : {}
}

export const UserReducer = (state = initialState, action) => {
    switch (action?.type) {
        case GET_USER_SUCCESS:
            localStorage.setItem('users', JSON.stringify(action.payload))

            return {
                ...state,
                users: [...action.payload]
            }

        case LOGINED_USER_SUCCESS: 
            localStorage.setItem('loginedUser', JSON.stringify(action.payload.user))
            localStorage.setItem('jwt_token', action.payload.token)

            return {
                ...state,
                loginedUser: {...action.payload.user}
            }

        case LOGOUT_USER_SUCCESS:
            localStorage.removeItem('loginedUser')
            localStorage.removeItem('jwt_token')

            return {
                ...state,
                loginedUser: {}
            }

        case PROFILE_EDT_USER_SUCCESS: 
            localStorage.setItem('loginedUser', JSON.stringify(action.payload))

            return {
                ...state,
                loginedUser: {...action.payload}
            }
        
        default:
            return state;
    }
}