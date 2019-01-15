import { Router } from 'express';
import User from '../models/user';
import passport from 'passport';
import {authenticate, generateAccessToken, respond } from '../middleware'

export default() => {
    let api = Router();

    api.post('/register', (req, res) => {
        User.register(new User({username: req.body.email}),
             req.body.password, 
                function(err, User)  {
                 if (err) res.send(err);

                 passport.authenticate('local', {
                     session: false
                 })(req, res, ()=> {
                     res.status(200).send('User created successfully');
                 });
        });
    });
    api.post('/login', passport.authenticate('local', {session: false, scope: []}),
        generateAccessToken, respond
    );
    api.get('/logout', authenticate, (req, res) => {
        req.logout();
        res.status(200).send('user logged out successfully');
    });
    api.get('/users', (req,res)=> {
        User.find({}, (err, users)=> {
            res.json(users);
        })
    });

    return api;
}