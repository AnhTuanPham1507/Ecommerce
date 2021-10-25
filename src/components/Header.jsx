import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { MDBInput } from 'mdbreact'
import logo from '../assets/images/Logo-2.png'
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import { removeToken } from '../actions/token'
import { useDispatch } from 'react-redux'
import HeaderUserInfo from './HeaderUserInfo'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
]

const Header = () => {
    const { pathname } = useLocation()

    const numItemCart = useSelector(state => state.cart.reduce((total, cart) => total + cart.list.length, 0))
    const token = useSelector(state => state.token.value)

    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')

    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null)

    const history = useHistory()

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll", null)
        }
    }, []);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const activeSearchBar = useRef(null)

    const onSearching = () => activeSearchBar.current.inputElementRef.current.classList.toggle('active')

    const onLogout = () => {
        const action = removeToken()
        dispatch(action)
    }

    const iconUser = React.forwardRef(({ children, onClick }, ref) => (

        <i className="bx bx-user"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
            {children}
        </i>
    ));

    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`/search/?name=${searchTerm}`)
    }

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <form onSubmit={handleSearch}>
                                <MDBInput ref={activeSearchBar} className="header__menu__right__item__search" label="Tim Kiem" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </form>
                            <i className="bx bx-search" onClick={onSearching}></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                                {numItemCart != 0 && <span ><strong>{numItemCart}</strong></span>}
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Dropdown>
                                <Dropdown.Toggle as={iconUser} id="dropdown-custom-components">
                                </Dropdown.Toggle>
                                <HeaderUserInfo token={token} onLogout={onLogout} />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
