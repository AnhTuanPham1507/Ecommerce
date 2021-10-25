import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import Button from './Button'

import numberWithCommas from '../util/tranformPrice';

import { setProductModal } from '../actions/product-modal';
import { useDispatch } from 'react-redux';

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

function ProductCard(props) {
    const { product } = props
    const dispatch = useDispatch()

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
                <div className="product-card__image">
                    {
                        product.productdetail_set.map((pDetail, index) => (
                            <img key={index} src={pDetail.image} alt="" />
                        ))
                    }

                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(product.productdetail_set[0].price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(999999)}</del>
                    </span>
                </div>
            </Link>
            <div className="prodcut-card__btn">
                <Button
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => dispatch(setProductModal(product))}
                >
                    Chọn mua
                </Button>
            </div>
        </div>
    );
}

export default ProductCard;