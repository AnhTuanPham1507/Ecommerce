import React from 'react';

import { Container } from 'react-bootstrap';

import { useHistory } from 'react-router';

import RegisterForm from '../components/RegisterForm';

function Register() {
    const history = useHistory()

    function handleRegisterSubmit(formRef) {
        const registerForm = formRef.current
        const formData = new FormData(registerForm)
        async function createCustomer() {
            try {
                const res = await fetch(registerForm.action, {
                    method: 'POST',
                    body: formData
                })
                if (res.status === 201) {
                    alert('đăng ký thành công')
                    localStorage.setItem('username', formData.get('account.username'))
                    localStorage.setItem('password', formData.get('account.password'))
                    history.push('/login')
                }
                else {
                    const data = await res.json()
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        createCustomer()
    }

    return (
        <Container>
            <h1>Đăng ký</h1>
            <RegisterForm onRegisterSubmit={handleRegisterSubmit} />
        </Container>
    );
}

export default Register;