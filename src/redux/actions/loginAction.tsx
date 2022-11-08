import { USER_LOGIN } from "../types/types";

export const userLogin = (items: any) => {
    window.localStorage.setItem('auth', JSON.stringify(items))
    return {
        type: USER_LOGIN,
        payload: items
    }
}