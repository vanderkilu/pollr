const setAuth = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data.data.token));
    localStorage.setItem('id', JSON.stringify(data.data.id));
}

const getAuth = () => {
    return {
        token: JSON.parse(localStorage.getItem('jwt')),
        userId: JSON.parse(localStorage.getItem('id'))
    }
}

export { setAuth, getAuth }