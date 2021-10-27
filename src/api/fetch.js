export const url = 'https://ecommerce1507server.herokuapp.com/'

export const getFetch = (path, token) => {
    const config = {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${token}`
        }
    }
    return fetch(url + path, config)
}

export const postFetch = (path, data, token = '') => {
    const config = {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            "content-type": 'application/json',
        },
        body: JSON.stringify(data)
    }
    return fetch(url + path, config)
}

export const putFetch = (path, data, token) => {
    const config = {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data })
    }
    return fetch(url + path, config)
}

export const getTokenFetch = (path, data) => {
    const config = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    return fetch(url + path, config)
}
