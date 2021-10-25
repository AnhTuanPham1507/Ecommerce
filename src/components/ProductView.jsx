import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import Button from './Button'

import numberWithCommas from '../util/tranformPrice';

import { addNewCartItem } from '../actions/cart';

import { useHistory } from 'react-router-dom'

ProductView.propTypes = {
    product: PropTypes.object,
};

ProductView.defaultProps = {
    product: {
        productdetail_set: [
            { image: null, price: 0 }
        ]
    }
}

function ProductView(props) {
    const product = props.product

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const history = useHistory()

    const [previewImg, setPreviewImg] = useState(undefined)
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [mainType, setMainType] = useState(undefined)
    const [subType, setSubType] = useState(undefined)
    const [quantity, setQuantity] = useState(1)
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(undefined)
    const [pDetailId, setPDetailId] = useState(1)

    function updateQuantity(type) {
        if (type === 'plus' && stock > quantity)
            setQuantity(quantity + 1)
        if (type === 'minus')
            setQuantity(quantity > 1 ? quantity - 1 : quantity)
    }

    function check() {
        if (mainType === undefined) {
            alert(`chọn ${product.main_type} đi !!`)
            return false
        }


        if (subType === undefined && product.sub_type !== '') {
            alert(`chọn ${product.sub_type} đi !!`)
            return false
        }

        return true
    }

    function addToCard() {
        if (check()) {
            const action = addNewCartItem({ product, quantity, mainType, subType, price, image, pDetailId })
            dispatch(action)
        }
    }

    function buyNow() {
        if (check()) {
            const action = addNewCartItem({ product, quantity, mainType, subType, price, image, pDetailId })
            dispatch(action)
            history.push('/cart')
        }
    }

    useEffect(() => {
        setPreviewImg(image)
    }, [image])

    useEffect(() => {
        try {
            let temp = undefined
            if (product.sub_type !== '')
                temp = product.productdetail_set.filter(e => e.main_content === mainType && e.sub_content === subType)[0]
            else
                temp = product.productdetail_set.filter(e => e.main_content === mainType)[0]
            setPrice(temp.price)
            setStock(temp.quantity)
            setImage(temp.image)
            setPDetailId(temp.id)
            setQuantity(1)
        }
        catch (err) { }
    }, [mainType, subType])

    useEffect(() => {
        setPreviewImg(product.productdetail_set[0].image)
        setPrice(product.productdetail_set[0].price)
        setQuantity(1)
        if (product.sub_type === '')
            setSubType(product.productdetail_set[0].sub_content)
    }, [product])

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    {
                        product.productdetail_set.map((item) => (
                            <div className="product__images__list__item" onClick={() => setPreviewImg(item.image)}>
                                <img src={item.image} alt={item.name} />
                            </div>
                        ))
                    }
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẫm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}>
                    </div>
                    <div className="product-description__toggle">
                        <Button
                            size="sm"
                            onClick={() => setDescriptionExpand(!descriptionExpand)}
                        >
                            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
                        </Button>

                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">
                    {product.name}
                </h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(price)}
                    </span>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        {product.main_type}
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.productdetail_set.filter((detail) => detail.quantity >= 1).map((item, index) => (
                                <div key={index} className="product__info__item__list__item">
                                    <button
                                        type="button"
                                        className=
                                        {
                                            `btn ${mainType === item.main_content ? 'btn-outline-danger active' : ' btn-outline-info'} ${(subType !== item.sub_content && subType) ? 'diabled' : ''}`
                                        }
                                        data-mdb-ripple-color="dark"
                                        onClick={() => { if (mainType === item.main_content) setMainType(undefined); else setMainType(item.main_content) }}
                                        aria-disabled={(subType !== item.sub_content && subType)}
                                        disabled={(subType !== item.sub_content && subType)}
                                    >
                                        {item.main_content}
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        {product.sub_type}
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.sub_type !== "" ?
                                product.productdetail_set.filter((detail) => detail.quantity >= 1).map((item, index) => (
                                    <div key={index} className="product__info__item__list__item">
                                        <button
                                            type="button"
                                            className=
                                            {
                                                `btn ${subType === item.sub_content ? 'btn-outline-danger active' : 'btn-outline-info'} ${(mainType !== item.main_content && mainType) ? 'diabled' : ''}`
                                            }
                                            data-mdb-ripple-color="dark"
                                            onClick={() => { if (subType === item.sub_content) setSubType(undefined); else setSubType(item.sub_content) }}
                                            aria-disabled={(mainType !== item.main_content && mainType)}
                                            disabled={(mainType !== item.main_content && mainType)}
                                        >
                                            {item.sub_content}
                                        </button>
                                    </div>
                                ))
                                : null
                        }
                    </div>
                </div>


                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("minus")}>
                            <i className="bx bx-minus" />
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>

                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity("plus")}>
                            <i className="bx bx-plus" />
                        </div>
                        <p className="product__info__item__quantity__stock">
                            Hàng còn trong kho: {stock}
                        </p>
                    </div>
                </div>

                <div className="product__info__item">
                    <Button onClick={addToCard}>
                        Thêm vào giỏ hàng
                    </Button>
                    <Button onClick={buyNow}>
                        Mua ngay
                    </Button>
                </div>
            </div>
        </div >
    );
}

export default ProductView;