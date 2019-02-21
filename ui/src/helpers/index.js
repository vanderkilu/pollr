const setAuth = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data.data.token));
    localStorage.setItem('id', JSON.stringify(data.data.id));
    localStorage.setItem('profile', JSON.stringify(data.data.profile))
}

const getAuth = () => {
    return {
        token: JSON.parse(localStorage.getItem('jwt')),
        userId: JSON.parse(localStorage.getItem('id')),
        profile: JSON.parse(localStorage.getItem('profile'))
    }
}

export { setAuth, getAuth }