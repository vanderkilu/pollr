
import Comment from '../models/comment'
import Reply from '../models/reply'
import { cpus } from 'os';


const getAllCommentForPoll = (req, res) => {
    Comment.find({poll: req.params.poll_id})
            .populate('user')
            .exec((err, comments) => {
                if (err) return res.send(err)
                return res.json(comments)
            })
}

const createComment = (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        user: req.user.id,
        poll: req.params.poll_id
    })
    comment.save((err,newComment)=> {
        Comment.populate(newComment, 'user', (err, mComment)=> {
            if (err) return res.send(err)
            return res.json(mComment)
        })
    })
}

const  getAllReplyForComment = (req, res) => {
    Reply.find({comment: req.body.id})
            .populate('user')
            .exec((err, replies) => {
                if (err) return res.send(err)
                return res.json(replies)
            })
}

const createReply = (req,res) => {
    const reply = new Reply({
        text: req.body.text,
        user: req.user.id,
        comment: req.body.id
    })
    reply.save((err, newReply)=> {
        if (err) return res.send(err)
        return res.json(newReply)
    })
}

const like = (req, res)=> {
    Comment.findById(req.body.id, (err, comment)=> {
        if (err) return res.send(err)
        const userIn = comment.likes.find(id => JSON.stringify(id) === JSON.stringify(req.user.id))
        if (userIn) {
            comment.likes.splice(comment.likes.indexOf(userIn), 1)
            comment.save((err)=> {
                return res.json({data: -1})
            })
        }
        else {
            comment.likes.push(req.user.id)
            comment.save((err, newComment)=> {
                if (err) return res.json(err)
                return res.json({data: 1})
            })
        }
    })
}

export {
    getAllCommentForPoll,
    createComment,
    getAllReplyForComment,
    createReply,
    like
}