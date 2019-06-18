import User from '../models/user';
import passport from 'passport';
import Poll from '../models/polls';

exports.register = (req, res) => {
    User.register(new User({username: req.body.email, profile: req.body.profile}),
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

exports.getPollsForUser = (req, res)=> {
    Poll.find({user: req.params.user_id})
        .populate('category')
        .populate('user')
        .exec((err, polls)=> {
            if (err) return res.json(err)
            return res.json(polls)
        })
}