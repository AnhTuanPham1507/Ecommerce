import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import numberWithCommas from '../util/tranformPrice'
import { Link } from 'react-router-dom'
import { adjustQuantity, removeCartItem } from '../actions/cart'

CartItem.propTypes = {
    item: PropTypes.object.isRequired
}

function CartItem(props) {
    const { product, mainType, subType, price, quantity, image } = props.item

    const dispatch = useDispatch()

    function updateQuantity(type) {
        if (type === '+') {
            const action = adjustQuantity({ product, quantity: quantity + 1 })
            dispatch(action)
        }
        else if (quantity > 1) {
            const action = adjustQuantity({ product, quantity: quantity - 1 })
            dispatch(action)
        }
    }

    function removeCItem() {
        const action = removeCartItem({ product })
        dispatch(action)
    }

    return (
        <div className="cart__item" >
            <div className="cart__item__image">
                <img src={image} alt={product.name} />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/product/${product.id}`}>
                        {`${product.name} - ${mainType} - ${subType}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(Number(price))}
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__del">
                    <i className='bx bx-trash' onClick={() => removeCItem()}></i>
                </div>
            </div>
        </div>
    )
}

export default CartItem
