import express from 'express'
import {authenticate, generateAccessToken, respond } from '../middleware'
import passport from 'passport';
const AccountController = require('../controller/accounts')
const PollController = require('../controller/newPolls')
const CommentController = require('../controller/comment')


module.exports = (app) => {

    const apiRoutes = express.Router()
    const authRoutes = express.Router()
    const pollRoutes = express.Router()

    apiRoutes.use('/account', authRoutes)
    apiRoutes.use('/poll', pollRoutes)

    //account routes
    authRoutes.post('/register', AccountController.register)
    authRoutes.post('/login', passport.authenticate('local', {session: false, scope: []}), 
                    generateAccessToken, respond)
    authRoutes.get('/logout', AccountController.logout)
    authRoutes.get('/users', AccountController.users)

    //poll routes
    pollRoutes.post('/create',authenticate,PollController.createPoll)
    pollRoutes.get('/category/:category_id/polls',authenticate,PollController.getPollsForCategory)
    pollRoutes.get('/categories',PollController.getAllCategory)
    pollRoutes.post('/category',authenticate,PollController.createCategory)
    pollRoutes.get('/', authenticate, PollController.getAllPoll)
    pollRoutes.get('/:poll_id', authenticate, PollController.getPoll)
    pollRoutes.put('/:poll_id', authenticate, PollController.updatePoll)
    pollRoutes.delete('/:poll_id', authenticate, PollController.deletePoll)
    pollRoutes.post('/:poll_id/vote',authenticate,PollController.vote)
    pollRoutes.get('/:poll_id/polloptions', authenticate, PollController.getPollOptionsForPoll)
    pollRoutes.put('/:poll_id/polloptions/:poll_option_id', authenticate, PollController.updatePollOption)

    //comment routes
    pollRoutes.get('/:poll_id/comment',authenticate,CommentController.getAllCommentForPoll)
    pollRoutes.post('/:poll_id/comment',authenticate,CommentController.createComment)
    pollRoutes.get('/comment/reply',authenticate,CommentController.getAllReplyForComment),
    pollRoutes.post('/comment/reply',authenticate,CommentController.createReply)
   

    return app.use('/api', apiRoutes)
}





