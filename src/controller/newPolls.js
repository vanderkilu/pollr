import Poll from '../models/polls';
import PollOption from '../models/poll_option'
import Vote from '../models/votes'
import Category from '../models/category'


exports.createPoll = (req, res) => {
    const poll = new Poll({title: req.body.title, user: req.user.id, category:req.body.category})
    let options = req.body.pollOptions
    options = options.map((option) => { 
        option.poll = poll._id  
        return option
    })
    PollOption.create(options, (err, newOptions) => {
        if (err) return res.send(err)
        poll.pollOptions.push(...newOptions)
        poll.save((err, newPoll) => {
            if (err) return res.send(err)
            return res.json(newPoll)
        })
    })
}

exports.createCategory = (req, res) => {
    const category = new Category({name: req.body.name})
    category.save((err, newCategory) => {
        if (err) return res.send(err)
        return res.json(newCategory)
    })
}

exports.getAllCategory = (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return res.send(err)
        return res.json(categories)
    })
}

exports.getPollsForCategory = (req, res) => {
    Poll.find({category: req.params.category_id})
        .populate('category')
        .populate('user')
        .exec((err, polls)=> {
            if (err) return res.json(err)
            return res.json(polls)
        })
}

exports.getPoll = (req, res) => {
    Poll.findById(req.params.poll_id)
        .populate('category')
        .populate('user')
        .exec((err, poll)=> {
            if (err) return res.send(err)
            return res.json(poll)
        })
}

exports.updatePoll = (req, res) => {
    Poll.findOneAndUpdate({_id: req.params.poll_id}, {$set: {title: req.body.poll.title}},{new: true}, (err,poll)=>{
        if (err) return res.send(err) 
        return res.json(poll)
    })
}

exports.updatePollOption = (req, res) => {
    let option = req.body.option
    PollOption.findOneAndUpdate({_id: option._id}, {$set: {value: option.value}},{new: true},(err, opt)=> {
            if (err) return res.send(err)
            return res.send(opt)
    })
}

exports.deletePoll = (req, res) => {
    Poll.findById(req.params.poll_id, (err, poll) => {
        if (JSON.stringify(poll.user) === JSON.stringify(req.user.id )) {
            poll.remove()
            return res.send('deleted successful')
        }
        else {
             return res.send('you cant perform operation');
        }
    });
}

exports.getAllPoll = (req,res) => {
    Poll.find({}, (err, polls)=> {
        if (err) return res.send(err)
        return res.json(polls)
    })
}

exports.vote = (req, res) => {
    PollOption.findById(req.body.id, (err, option)=> {
        Vote.findOne({user: req.user.id, poll:req.params.poll_id}, (err, v)=> {
            if (v) return res.json({type:'reduce', pollOption: option.value})
            const vote = new Vote({
                user: req.user.id,
                pollOption: option._id,
                poll: req.params.poll_id
            })
            vote.save((err, newVote)=> {
                if (err) return res.send(err)
                option.votes.push(newVote)
                option.save((err, newOption)=> {
                    if (err) return res.send(err)
                    return res.json({type:'increase', pollOption: newOption.value})
                })
            })
        })
    })
}

exports.getPollOptionsForPoll = (req, res) => {
    PollOption.find({poll: req.params.poll_id}, (err, options)=> {
        if (err) return res.send(err)
        return res.json(options)
    })
}

exports.getRecentPolls = (req, res)=> {
    Poll.find({},{}, { sort: { 'created' : -1 }}).limit(10)
        .populate('category')
        .populate('user')
        .exec((err, polls)=> {
            if (err) return res.json(err)
            return res.json(polls)
        })
}

exports.updatePollCount = (req, res) => {
   Poll.findOneAndUpdate({_id: req.params.poll_id}, {$inc: {count: 1}},{new: true}, (err,poll)=> {
        if (err) return res.send(err)
        return res.json(poll)
    })
}

exports.getPopularPolls = (req, res) => {
    Poll.find({})
        .sort('-count')
        .limit(10)
        .populate('category')
        .populate('user')
        .exec((err, polls)=> {
            if (err) return res.json(err)
            return res.json(polls)
        })
}
