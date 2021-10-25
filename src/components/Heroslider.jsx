import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'

import Button from '../components/Button'

Heroslider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
};

function Heroslider(props) {
    const { data } = props
    const [activeSlide, setActiveSlide] = useState(0)

    const nextSlide = useCallback(() => {
        const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
        setActiveSlide(index)
    }, [activeSlide, data])

    useEffect(() => {
        const autoNextSlide = setInterval(() => {
            nextSlide()
        }, 3000)
        return () => {
            clearInterval(autoNextSlide)
        }
    }, [nextSlide])

    return (
        <div className="hero-slider">
            {
                data.map((item, index) => (
                    <HeroSliderItem key={index} item={item} active={index === activeSlide} />
                ))
            }
        </div>
    );
}

function HeroSliderItem(props) {
    return (
        <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
            <div className="hero-silder__item__info">
                <div className={`hero-slider__item__info__title color-${props.item.color}`}>
                    <span>{props.item.title}</span>
                </div>
                <div className="hero-slider__item__info__description">
                    <span>{props.item.description}</span>
                </div>
                <div className="hero-slider__item__info__btn">
                    <Link to={props.item.path}>
                        <Button
                            backgroundColor={props.item.color}
                            icon="bx bx-cart"
                            animate={true}
                        >
                            Xem chi tiết
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="hero-slider__item__image">
                <div className={`shape bg-${props.item.color}`}></div>
                <img src={props.item.img} alt="" />
            </div>
        </div>
    )
}
export default Heroslider;