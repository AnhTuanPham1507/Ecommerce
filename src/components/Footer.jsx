import React from 'react';

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../assets/images/Logo-2.png'

const footerAboutLink = [
    {
        display: 'Gioi thieu',
        path: '/about'
    },
    {
        display: 'Lien he',
        path: '/about'
    },
    {
        display: 'Tuyen dung',
        path: '/about'
    },
    {
        display: 'Tin tuc',
        path: '/about'
    },
    {
        display: 'He thong cua hang',
        path: '/about'
    },
]

const footerCustomerLink = [
    {
        display: 'Chinh sach doi tra',
        path: '/about'
    },
    {
        display: 'Chinh sach bao hanh',
        path: '/about'
    },
    {
        display: 'Chinh sach hoan tien',
        path: '/about'
    },

]

function Footer() {
    return (
        <footer>
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            Tong dai ho tro
                        </div>
                        <div className="title__content">
                            <p>
                                Lien he dat hang <strong>0123456789</strong>
                            </p>
                            <p>
                                Thac mac don hang <strong>0123456789</strong>
                            </p>
                            <p>
                                Gop y , khieu nai<strong>0123456789</strong>
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="footer__title">
                            Về Ecommerce
                        </div>
                        <div className="title__content">
                            {
                                footerAboutLink.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <div className="footer__title">
                            Chăm sóc khách hàng
                        </div>
                        <div className="title__content">
                            {
                                footerCustomerLink.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Mua là ưng liền , mua lệ không hêt nha mọi người
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    );
}

export default Footer;