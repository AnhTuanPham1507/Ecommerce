export const setProductModal = (product) => {
    return {
        type: 'SET',
        payload: product
    }
}

export const removeProductModal = () => {
    return {
        type: 'REMOVE',
    }
}