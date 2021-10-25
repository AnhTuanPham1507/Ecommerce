import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router';

HeaderUserInfo.propTypes = {
    token: PropTypes.string,
    onLogout: PropTypes.func,
};

function HeaderUserInfo(props) {
    const { token, onLogout } = props

    const history = useHistory()

    function handleLogout() {
        if (onLogout) {
            onLogout()
            history.push('/')
        }
    }

    return (
        <Dropdown.Menu>
            {
                token != undefined
                    ?
                    <>
                        <Dropdown.Item href="/user-info">Xem thông tin</Dropdown.Item>
                        <Dropdown.Item href="/order">Xem đơn hàng</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            đăng xuất
                        </Dropdown.Item>
                    </>
                    :
                    <Dropdown.Item href="/login">Đăng nhập</Dropdown.Item>
            }
        </Dropdown.Menu>

    );
}

export default HeaderUserInfo;