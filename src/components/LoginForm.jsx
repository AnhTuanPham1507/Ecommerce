import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

LoginForm.propTypes = {
    onLoginSubmit: PropTypes.func.isRequired
};

function LoginForm(props) {
    const { onLoginSubmit } = props
    const initUsername = localStorage.getItem('username')
    const initPassword = localStorage.getItem('password')

    const [username, setUsername] = useState(() => {
        return initUsername ? initUsername : ''
    })
    const [password, setPassword] = useState(() => {
        return initPassword ? initPassword : ''
    })

    function handleLoginSubmit(e) {
        e.preventDefault()
        const formvalues = {
            username,
            password
        }
        onLoginSubmit(formvalues)
    }

    return (
        <>
            <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="User Name" name="account.username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="account.password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Link to="/register">Chưa có tài khoản</Link>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default LoginForm;