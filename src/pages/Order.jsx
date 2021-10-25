import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import { getFetch, postFetch } from '../api/fetch';

import OrderTable from '../components/OrderTable';


function Order() {
    const [listOrder, setListOrder] = useState([])
    const token = useSelector(state => state.token.value)

    const search = useLocation().search;
    const orderId = new URLSearchParams(search).get('orderId')
    const requestId = new URLSearchParams(search).get('requestId')


    useEffect(() => {
        if (orderId && requestId) {
            async function checkPayment() {
                try {
                    const response = await postFetch('checkpayment/', { orderId, requestId }, token)
                    const data = await response.json()
                    if (response.status !== 500) {
                        alert(data.message)
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            checkPayment()
        }
    }, [orderId, requestId])

    useEffect(() => {
        async function getOrder() {
            try {
                const response = await getFetch('order/', token)
                const data = await response.json();
                if (response.status !== 400) {
                    setListOrder(data.results)
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getOrder()
    }, [])

    return (
        <OrderTable listOrder={listOrder} />
    );
}

export default Order;