const initState = {
    value: {}
}

const ProductModalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET':
            return {
                value: action.payload
            }

        case 'REMOVE':
            return {
                value: {}
            }

        default: return state
    }
}

export default ProductModalReducer