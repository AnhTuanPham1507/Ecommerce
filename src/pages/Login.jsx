import React from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { addToken } from '../actions/token';
import { getTokenFetch } from '../api/fetch';

function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    function handleLoginSubmit(formValues) {
        const { username, password } = formValues
        const grant_type = 'password'

        async function getToken() {
            try {
                const response = await getTokenFetch('o/token/', { username, password, grant_type })
                const data = await response.json();
                if (response.status !== 400) {
                    localStorage.clear()
                    localStorage.setItem('token', data.access_token)
                    const action = addToken(data.access_token)
                    dispatch(action)
                    history.push('/')
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        getToken()
    }

    return (
        <Container>
            <h1>Đăng nhập</h1>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
        </Container>
    );
}

export default Login;