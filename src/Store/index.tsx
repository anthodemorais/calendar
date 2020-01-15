import { createStore } from 'redux'

const initState = {
    user_is_logged: false,
    user_role: 'visitor'
}

const reducer = (state = initState, action) => {

    if (action.type === 'CONNECT_USER') {
        return {
            ...state,
            user_is_logged: true
        }
    }
    else if (action.type === 'SET_ROLE') {
        return {
            ...state,
            user_role: action.role
        }
    }

    return state
}

const store = createStore(reducer)

export default store