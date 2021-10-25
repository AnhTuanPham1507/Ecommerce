import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

import numWithCommas from '../util/tranformPrice'
import formatDate from '../util/formatDate'

OrderTable.propTypes = {
    listOrder: PropTypes.array,
};

function OrderTable(props) {

    const listOrder = props.listOrder

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày mua</th>
                    <th>Ngày giao hàng</th>
                    <th>Sản phẩm</th>
                    <th>Người bán</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái đơn hàng</th>
                </tr>
            </thead>
            <tbody>
                {
                    listOrder.map((order) => (
                        <tr>
                            <td>{order.id}</td>
                            <td>{formatDate(order.created_date)}</td>
                            <td>{formatDate(order.shipped_date)}</td>
                            <td>
                                <select class="browser-default custom-select">
                                    {
                                        order.orderdetail_set.map((oDetail) =>
                                            <option>
                                                {`${oDetail.product.name} - ${oDetail.product.main_content} - ${oDetail.product.sub_content}`}
                                            </option>
                                        )
                                    }
                                </select>
                            </td>
                            <td>{`${order.seller.account.first_name} ${order.seller.account.last_name}`}</td>
                            <td>{numWithCommas(order.total_price)}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default OrderTable;