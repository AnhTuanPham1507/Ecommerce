import cartReducer from './cart'
import ProductModalReducer from './product-modal'

import { combineReducers } from 'redux'
import tokenReducer from './token'

const rootReducer = combineReducers({
    cart: cartReducer,
    productModal: ProductModalReducer,
    token: tokenReducer,
})

export default rootReducer