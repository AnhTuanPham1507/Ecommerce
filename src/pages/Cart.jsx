import React, { useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import Error from './Error'

import numberWithCommas from '../util/tranformPrice'

import { postFetch } from '../api/fetch'

import { clearCart } from '../actions/cart'


function Cart() {
    const [address, setAddress] = useState('')

    const history = useHistory()

    const cartList = useSelector(state => state.cart)
    const token = useSelector(state => state.token.value)

    const payRef = useRef(null)

    const dispatch = useDispatch()


    function handleOrder() {
        if (address == '' || address.length < 5) {
            alert('hay nhập đúng địa chỉ giao hàng !!')
            return
        }

        if (token != undefined) {
            async function createorder() {
                const seller = cartList[0].seller.id
                const total_price = cartList[0].total_price
                const order_detail = cartList[0].list.map((cart) => new Object({ product: cart.pDetailId, quantity: cart.quantity }))
                try {
                    const orderRes = await postFetch(`order/`, { seller, total_price, order_detail, address }, token)
                    const order = await orderRes.json();
                    if (orderRes.status !== 400) {
                        if (payRef.current.value === 'MOMO') {
                            await handlePayment(token, order)
                        }
                        else {
                            alert('đơn hàng đã được tiếp nhận')
                            const action = clearCart()
                            dispatch(action)
                            history.push('/order')
                        }
                    }
                    else {
                        alert(order.message)
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            createorder()
        }
        else {
            alert('hãy đăng nhập trước khi đặt hàng')
            history.push('/login')
        }
    }

    async function handlePayment(token, order) {
        const paymentRes = await postFetch(`paymomo/`, { amount: String(order.total_price), seller_id: String(order.seller.id), order_id: String(order.id) }, token)
        const payment = await paymentRes.json()
        if (paymentRes !== 500 && payment.resultCode == 0) {
            window.location.assign(payment.payUrl)
        }
        else {
            alert(payment.message)
        }
    }

    return (
        <Helmet title="Giỏ hàng">
            {cartList.length != 0
                ?
                <div className="cart">

                    <div className="cart__list">
                        {
                            cartList.map((cart) => (
                                <>
                                    <h1>Người bán hàng: {cart.seller.account.first_name} {cart.seller.account.last_name} </h1>
                                    {
                                        cart.list.map((cartDetail, index) => (
                                            <CartItem item={cartDetail} key={index} />
                                        ))
                                    }
                                </>
                            ))
                        }
                    </div>

                    <div className="cart__info">
                        <div className="cart__info__txt">
                            {
                                cartList.map((cart) => (
                                    <>
                                        <h2>Sản phẩm của {cart.seller.account.first_name} {cart.seller.account.last_name}</h2>
                                        <p>
                                            Bạn đang có {cart.list.length} sản phẩm trong giỏ hàng
                                        </p>
                                        <div className="cart__info__txt__price">
                                            <span>Thành tiền:</span> <span>{numberWithCommas(cart.total_price)}</span>
                                        </div>
                                    </>
                                ))
                            }

                            <div className="cart__info__txt__payment">
                                <h2>Phương thức thanh toán</h2>
                                <select ref={payRef} class="browser-default custom-select">
                                    <option selected value="MOMO">Thanh toán MoMo</option>
                                    <option value="IN_PERSON">thanh toán trực tiếp</option>
                                </select>
                            </div>
                            <div className="cart__info__txt__ship">
                                <h2>Nhập địa chỉ giao hàng</h2>
                                <input type="text" id="form12" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="cart__info__txt__price">
                                <span>Tổng trả:</span> <span>{numberWithCommas(cartList.reduce((total, cart) => total + cart.total_price, 0))}</span>
                            </div>

                        </div>
                        <div className="cart__info__btn">
                            <Button onClick={handleOrder} size="block">
                                Đặt hàng
                            </Button>

                            <Link to="/">
                                <Button size="block">
                                    Tiếp tục mua hàng
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>
                :
                <Error title={"Giỏ hàng trống kìa , mua gì đó đi"} />
            }
        </Helmet >
    )
}

export default Cart
