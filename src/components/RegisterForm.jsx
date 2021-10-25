import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { url } from '../api/fetch';

RegisterForm.propTypes = {
    onRegisterSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
    const { onRegisterSubmit } = props
    const formRef = useRef(null)

    function handleRegisterSubmit(e) {
        e.preventDefault()

        onRegisterSubmit(formRef)
    }
    return (

        <>
            <Form ref={formRef} onSubmit={handleRegisterSubmit} enctype="multipart/form-data" action={`${url}customer/`}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="User Name" name="account.username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="account.password" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" name="account.first_name" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name="account.last_name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="account.email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" name="phone" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Identity</Form.Label>
                    <Form.Control type="text" placeholder="Idnetity" name="identity" />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" name="account.avatar" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default RegisterForm;