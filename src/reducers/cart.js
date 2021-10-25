const initState = []
// list: [{product, main, sub, quantity, image}],
// total_price: 0
// seller

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_CART_ITEM': {
            try {
                const cartList = [...state]
                const cartIndex = cartList.findIndex(cart => cart.seller.id === action.payload.product.seller.id)
                const { quantity, price } = action.payload

                if (cartIndex != -1) {
                    const cartDetailIndex = cartList[cartIndex].list.findIndex(cartDetail => cartDetail.product.id === action.payload.product.id)
                    if (cartDetailIndex != -1) {
                        cartList[cartIndex].list[cartDetailIndex].quantity += quantity
                    }
                    else {
                        cartList[cartIndex].list.push(action.payload)
                    }
                    cartList[cartIndex].total_price += price * quantity
                }
                else {
                    cartList.push({ list: new Array(action.payload), total_price: price * quantity, seller: action.payload.product.seller })
                }

                return cartList
            }
            catch (err) {
                console.log(err)
            }
        }

        case 'ADJUST_QUANTITY': {
            try {
                const cartList = [...state]
                const cartIndex = cartList.findIndex(cart => cart.seller.id === action.payload.product.seller.id)
                let oldPrice = 0
                let newPrice = 0
                if (cartIndex != -1) {
                    cartList[cartIndex].list.forEach((cartDetail) => {
                        if (cartDetail.product.id === action.payload.product.id) {
                            oldPrice = cartDetail.price * cartDetail.quantity
                            newPrice = cartDetail.price * action.payload.quantity
                            cartDetail.quantity = action.payload.quantity
                        }
                    })

                    cartList[cartIndex].total_price = cartList[cartIndex].total_price - oldPrice + newPrice
                }
                return cartList
            }
            catch (err) {
                console.log(err)
            }

        }

        case 'REMOVE_CART_ITEM': {
            try {
                let cartList = [...state]
                const cartIndex = cartList.findIndex(cart => cart.seller.id === action.payload.product.seller.id)
                let minusPrice = 0
                cartList[cartIndex].list = cartList[cartIndex].list.filter(cartDetail => {
                    if (cartDetail.product.id === action.payload.product.id)
                        minusPrice = cartDetail.price * cartDetail.quantity
                    return cartDetail.product !== action.payload.product
                })
                if (cartList[cartIndex].list.length === 0)
                    cartList = cartList.filter((cart, index) => index !== cartIndex)
                else
                    cartList[cartIndex].total_price -= minusPrice
                return cartList
            }
            catch (err) {
                console.log(err)
            }

        }

        case 'CLEAR_CART': {
            return new Array()
        }

        default: return state
    }
}

export default cartReducer