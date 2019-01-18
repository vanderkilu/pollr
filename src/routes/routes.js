import express from 'express'
import {authenticate, generateAccessToken, respond } from '../middleware'
import passport from 'passport';
const AccountController = require('../controller/accounts')


module.exports = (app) => {

    const apiRoutes = express.Router()
    const authRoutes = express.Router()
    const pollRoutes = express.Router()

    apiRoutes.use('/account', authRoutes)

    //account routes
    authRoutes.use('/register', AccountController.register)
    authRoutes.use('/login', passport.authenticate('local', {session: false, scope: []}), 
                    generateAccessToken, respond)
    authRoutes.use('/logout', AccountController.logout)
    authRoutes.use('/users', AccountController.users)

    return app.use('/api', apiRoutes)
}





