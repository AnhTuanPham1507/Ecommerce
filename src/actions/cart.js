export const addNewCartItem = (cartItem) => {
    return {
        type: 'ADD_CART_ITEM',
        payload: cartItem
    }
}

export const adjustQuantity = (quantity) => {
    return {
        type: 'ADJUST_QUANTITY',
        payload: quantity
    }
}

export const removeCartItem = (cartItem) => {
    return {
        type: 'REMOVE_CART_ITEM',
        payload: cartItem
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}