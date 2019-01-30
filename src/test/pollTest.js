const Poll = require('../models/polls')
const PollOption = require('../models/poll_option')
const User = require('../models/user')
const Vote = require('../models/votes')
const Category = require('../models/category')
const app = require('../index')
const request = require("supertest").agent(app.listen())
const chai = require('chai')
const should = chai.should()


describe('POLL', ()=> {
    const pollUrl = '/api/poll'
    const accUrl = '/api/account'
    let Token = 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDM5MjkzZGJmNWQwMWVhYjk5ZGQzYSIsImlhdCI6MTU0NzkzMjMzNiwiZXhwIjoxNTUwNTI0MzM2fQ.45VLuWtMivjugWOe04CDdUQ5pjoQtlPEFhdUbme3LPs'
   
    describe('/GET POLLS', ()=> {

        it ('should return all polls if user is authenticated', (done)=> {
            request.get(pollUrl + '/')
                    .set('Authorization', Token)
                    .end((req, res)=> {
                        res.status.should.equal(200)
                        res.body.should.be.a('array')
                    })
                    done()
        })
    })

    describe('/CREATE POLL', ()=> {
        it('should create a new poll', (done)=> {
            const category = new Category({name: 'programming'})
            category.save((err, newCategory)=> {
                let pollDetails = {
                    title: 'gatsby or nuxt',
                    pollOptions: [{value: 'gatsby'}, {value: 'nuxt'}],
                    category: newCategory.id
                }
                request.post(pollUrl + '/create')
                    .set('Authorization', Token) 
                    .send(pollDetails)
                    .end((req, res)=> {
                        res.status.should.equal(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('pollOptions')
                        res.body.pollOptions.should.be.a('array')
                        res.body.pollOptions.length.not.equal(0)
                    })
                    done()
            })
            
        })
    })
})