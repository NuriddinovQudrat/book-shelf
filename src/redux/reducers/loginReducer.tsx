import { USER_LOGIN } from "../types/types"

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
        default:
            return state
    }
}

export default loginReducer