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
    authRoutes.get('/user/:user_id/polls',authenticate, AccountController.getPollsForUser)

    //poll routes
    pollRoutes.post('/create',authenticate,PollController.createPoll)
    pollRoutes.get('/category/:category_id/polls',PollController.getPollsForCategory)
    pollRoutes.get('/categories',PollController.getAllCategory)
    pollRoutes.get('/recent',  PollController.getRecentPolls)
    pollRoutes.get('/popular', PollController.getPopularPolls)
    pollRoutes.post('/category',authenticate,PollController.createCategory)
    pollRoutes.get('/',   PollController.getAllPoll)
    pollRoutes.get('/:poll_id',  PollController.getPoll)
    pollRoutes.put('/:poll_id', authenticate, PollController.updatePoll)
    pollRoutes.delete('/:poll_id', authenticate, PollController.deletePoll)
    pollRoutes.post('/:poll_id/vote',authenticate,PollController.vote)
    pollRoutes.put('/:poll_id/update-count',authenticate,PollController.updatePollCount)
    pollRoutes.get('/:poll_id/polloptions', PollController.getPollOptionsForPoll)
    pollRoutes.put('/:poll_id/polloptions', authenticate, PollController.updatePollOption)

    //comment routes
    pollRoutes.get('/:poll_id/comments',CommentController.getAllCommentForPoll)
    pollRoutes.post('/:poll_id/comments',authenticate,CommentController.createComment)
    pollRoutes.get('/comment/reply',authenticate,CommentController.getAllReplyForComment),
    pollRoutes.post('/comment/reply',authenticate,CommentController.createReply)
    pollRoutes.put('/comment/likes',authenticate,CommentController.like)
   

    return app.use('/api', apiRoutes)
}





