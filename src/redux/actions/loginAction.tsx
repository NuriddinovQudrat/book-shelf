import { USER_LOGIN, USER_LOGOUT } from "../types/types";

export const userLogin = (items: any) => {
    window.localStorage.setItem('auth', JSON.stringify(items))
    return {
        type: USER_LOGIN,
        payload: items
    }
}

export const userLogout = () => {
    window.localStorage.removeItem('auth')
    return {
        type: USER_LOGOUT
    }
}