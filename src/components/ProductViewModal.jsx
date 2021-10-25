import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ProductView from './ProductView'

import Button from './Button'

import { removeProductModal } from '../actions/product-modal'

const ProductViewModal = () => {

    const product = useSelector((state) => state.productModal.value)
    const dispatch = useDispatch()

    return (

        <div className={`product-view__modal ${Object.getOwnPropertyNames(product).length === 0 ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                {
                    Object.getOwnPropertyNames(product).length !== 0 ? <ProductView product={product} /> : null
                }
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"
                        onClick={() => dispatch(removeProductModal())}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal
