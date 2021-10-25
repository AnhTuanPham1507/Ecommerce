import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import UserInfo from '../pages/UserInfo';

UserInfoForm.propTypes = {
    user: PropTypes.object.isRequired,
    onInfoSubmit: PropTypes.func.isRequired,
    onInfoChange: PropTypes.func.isRequired,
};


function UserInfoForm(props) {
    const { user, onInfoSubmit, onInfoChange } = props

    function handleInfoSubmit(e) {
        e.preventDefault()
        onInfoSubmit()
    }

    return (
        <>
            <h1>Chỉnh sửa thông tin</h1>
            <Form onSubmit={handleInfoSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="User Name" defaultValue={user.username} disabled={true} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" value={user.first_name} onChange={(e) => onInfoChange(e.target.value, 'first_name')} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" value={user.last_name} onChange={(e) => onInfoChange(e.target.value, 'last_name')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={(e) => onInfoChange(e.target.value, 'email')} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" value={user.phone} onChange={(e) => onInfoChange(e.target.value, 'phone')} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Identity</Form.Label>
                    <Form.Control type="text" placeholder="Enter Idnetity" value={user.identity} onChange={(e) => onInfoChange(e.target.value, 'identity')} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Lưu
                </Button>
            </Form>
        </>
    );
}

export default UserInfoForm;