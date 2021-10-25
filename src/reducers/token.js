const initState = {
    value: localStorage.getItem('token')
}

const tokenReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            return {
                value: action.payload
            }

        case 'REMOVE_TOKEN':
            localStorage.removeItem('token')
            return {
                value: undefined
            }

        default: return state
    }
}

export default tokenReducer