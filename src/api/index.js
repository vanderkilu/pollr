import Axios from 'axios'
import { getAuth } from '../helpers'
const token =  getAuth().token
const headers = {
    headers: { Authorization: `Bearer ${token}` }
}

const axios = Axios.create({
    baseURL: 'http://localhost:30016/api',
})

const login = (data) => {
    return axios.post('account/login', data)
}

const signup = (data)=> {
    return axios.post('account/register', data)
}

const getAllCategory = () => {
    return axios.get('poll/categories', headers)
}

const getAllPoll = () => {
    return axios.get('poll/', headers)
}
const getAllPollsForCategory = (id) => {
    return axios.get(`poll/category/${id}/polls`, headers)
}
const getPoll = (id) => {
    return axios.get(`poll/${id}`, headers)
}

const getAllOptionsForPoll = (id) => {
    return axios.get(`poll/${id}/polloptions`, headers)
}

const doVote = (pollId, pollOptionId) => {
    return axios.post(`poll/${pollId}/vote`, {id: pollOptionId}, headers)
}

const createPoll = (data) => {
    return axios.post('poll/create', data, headers)
}
const getRecentPolls = () => axios.get('poll/recent', headers)

const updateCount = (pollId) => axios.put(`poll/${pollId}/update-count`, {}, headers)

const getAllComment = (pollId)=> {
    return axios.get(`poll/${pollId}/comments`, headers)
}
const commentCreate = (pollId, data) => axios.post(`poll/${pollId}/comments`,data, headers)

export  { 
    login, 
    signup, 
    getAllCategory, 
    getAllPoll, 
    getAllPollsForCategory, 
    getPoll,
    getAllOptionsForPoll,
    doVote,
    createPoll,
    getRecentPolls,
    updateCount,
    getAllComment,
    commentCreate
}

