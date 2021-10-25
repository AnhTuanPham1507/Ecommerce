import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getFetch, putFetch } from '../api/fetch';
import UserInfoForm from '../components/UserInfoForm';

function UserInfo() {
    const [user, SetUser] = useState({})
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function getUser() {
            const response = await getFetch('customer/current-customer/', token)
            let data = await response.json();
            if (response.status !== 400) {
                delete data.account.id
                delete data.account.avatar
                SetUser({ id: data.id, identity: data.identity, phone: data.phone, ...data.account })
            }
            else {
                alert(data.message)
            }
        }
        getUser()
    }, [])

    function handleInfoChange(value, key) {
        let newUser = { ...user }
        newUser[key] = value
        SetUser(newUser)
    }


    function handleInfoSubmit() {
        let tempUser = { ...user }
        delete tempUser.username
        delete tempUser.id
        async function putUser() {
            try {

                const response = await putFetch(`customer/${user.id}/`, tempUser, token)
                const data = await response.json();
                if (response.status !== 400) {
                    SetUser(data)
                    alert('Cập nhật thành công')
                }
                else {
                    alert(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }

        }
        putUser()
    }

    return (
        <Container>
            <UserInfoForm user={user} onInfoSubmit={handleInfoSubmit} onInfoChange={handleInfoChange} />
        </Container>
    );
}

export default UserInfo;