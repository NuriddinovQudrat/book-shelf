import { USER_LOGIN, USER_LOGOUT } from "../types/types"

const isData = window.localStorage.getItem('auth')
const authData = isData ? JSON.parse(window.localStorage.getItem('auth') || '') : null

const initialState = {
    auth: authData
}

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                auth: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                auth: false
            }
        default:
            return state
    }
}

export default loginReducer