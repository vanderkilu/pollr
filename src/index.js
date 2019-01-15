import express from 'express';
import bodyParser from  'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import passport from  'passport';
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy



import config from './config';
import routes from './routes/routes';
import User from './models/user';

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


app.use('/api', routes);






server.listen(config.port, (err)=> {
    if (err) return err;
    console.log('running');
});