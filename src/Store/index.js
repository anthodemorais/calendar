import { createStore } from 'redux'

const initState = {
    user_is_logged: false,
    user_role: 'visitor',
    token: "",
    user: {},
}

const reducer = (state = initState, action) => {

    if (action.type === 'CONNECT_USER') {
        return {
            ...state,
            user_is_logged: true,
            user_role: action.role,
            token: action.token,
            user: action.user
        }
    }

    return state
}

const store = createStore(reducer)

export default store