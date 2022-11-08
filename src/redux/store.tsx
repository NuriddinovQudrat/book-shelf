import { createStore, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'

const rootReducers = combineReducers({
    user: loginReducer
})

const store = createStore(rootReducers)
export type RootState = ReturnType<typeof store.getState>
export default store