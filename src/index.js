import express from 'express';
import bodyParser from  'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import passport from  'passport';
import config from './config';
import User from './models/user';
const cors = require('cors')
const router = require('./routes/routes')
const LocalStrategy = require('passport-local').Strategy





const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server);


mongoose.connect(config.mongooseUrl);
app.use(bodyParser.json({
    limit: config.limit
}));

app.use(passport.initialize());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate() ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(cors())

io.on('connection', (socket) => {
    socket.on('vote', (data) => {
        io.emit('vote', data);
    })
})


router(app);






server.listen(config.port, (err)=> {
    if (err) return err;
    console.log(config.port);
});