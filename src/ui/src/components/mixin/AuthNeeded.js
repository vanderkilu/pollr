const AuthNeeded = {
    beforeRouteEnter (to, from, next) {
        if (localStorage.getItem('jwt') === null) {
            next({name: 'login'});
        }
        else {
            next();
        }
    },
}

export default AuthNeeded