const User = require('../models/user')
const app = require('../index')
const request = require("supertest").agent(app.listen())
const chai = require('chai')
const should = chai.should()


describe('AUTH', ()=> {
    
    const accUrl = '/api/account'
    const loginDetails = {email: 'admin@gmail.com', password: 'P@$$w0rd'}

    describe('/GET USERS', ()=> {
        it('should return all users', (done)=> {
            request.get(accUrl + '/users')
                    .end((req, res)=> {
                        res.status.should.equal(200)
                        res.body.should.be.a('array')
                        res.body.length.should.not.equal(0)
                    })
                    done()
        })
    })

    describe('/SIGNUP ', ()=> {
        it('should not signup user if user exists', (done)=> {
            let userDetails = {email: 'admin@gmail.com', password: 'P@$$w0rd', profile: 'admin'}
            request.post(accUrl + '/register')
                    .send(userDetails)
                    .end((req, res)=> {
                        res.body.should.have.property('message')
                        res.body.name.should.equal('UserExistsError')
                    })
                    done()
        })
        it('should signup user with valid credentials', (done)=> {
            let userDetails = {email: 'test@gmail.com', password: 'testament', profile: 'test'}
            request.post(accUrl + '/register')
                    .send(userDetails)
                    .end((req, res)=> {
                        res.status.should.equal(200)
                        
                    })
                    done()
        })
    })

    describe('/LOGIN', ()=> {
        it('should login user and return token', (done)=> {
            request.post(accUrl + '/login')
                    .send(loginDetails)
                    .end((req, res)=> {
                        res.status.should.equal(200)
                        res.body.should.have.property('token')
                    })
                    done()
        })
    })
})