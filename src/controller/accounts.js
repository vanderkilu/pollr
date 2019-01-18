import User from '../models/user';
import passport from 'passport';

exports.register = (req, res) => {
    User.register(new User({username: req.body.email}),
        req.body.password,(err, user) => {
            if (err) return res.send(err)
            passport.authenticate('local', {session:false})
            (req, res, ()=> res.status(200).send('user created sucessfully'))
        }
    )
}

exports.logout = (req,res) => {
    req.logout()
    return res.status(200).send('user logged out successfully')
}

exports.users = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err)
        return res.json(users)
    })
}