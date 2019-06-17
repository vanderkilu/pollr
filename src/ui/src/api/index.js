import Axios from 'axios'
import { getAuth } from '../helpers'
const headers = () => {
    const token =  getAuth().token
    return {
        headers: { 'Authorization': `Bearer ${token}`}
    }
}

const axios = Axios.create({
    baseURL: 'http://localhost:3000',
})

const login = (data) => axios.post('/api/account/login', data)
const signup = (data)=> axios.post('/api/account/register', data)
const getAllCategory = () => axios.get('/api/poll/categories', headers())
const getAllPoll = () => axios.get('/api/poll/', headers())
const getAllPollsForCategory = (id) => axios.get(`/api/poll/category/${id}/polls`, headers())
const getPoll = (id) => axios.get(`/api/poll/${id}`, headers())
const getAllOptionsForPoll = (id) => axios.get(`/api/poll/${id}/polloptions`, headers())
const doVote = (pollId, pollOptionId) => axios.post(`/api/poll/${pollId}/vote`, {id: pollOptionId}, headers())
const createPoll = (data) => axios.post('/api/poll/create', data, headers())
const getRecentPolls = () =>  axios.get('/api/poll/recent', headers())
const updateCount = (pollId) => axios.put(`/api/poll/${pollId}/update-count`, {}, headers())
const getAllComment = (pollId)=> axios.get(`/api/poll/${pollId}/comments`, headers())
const commentCreate = (pollId, data) => axios.post(`/api/poll/${pollId}/comments`,data, headers())
const likeToggle = (commentId) => axios.put(`/api/poll/comment/likes`, {id: commentId}, headers())
const getPopularPolls = () => axios.get(`/api/poll/popular`, headers())
const getPollsForUser = (userId) => axios.get(`/api/account/user/${userId}/polls`, headers())
const updatePoll = (pollId, data) => axios.put(`/api/poll/${pollId}`, data, headers())
const updatePollOption = (pollId, data)=> axios.put(`/api/poll/${pollId}/polloptions`, data, headers())
const deletePoll = (pollId)=> axios.delete(`/api/poll/${pollId}`, headers())

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
    commentCreate,
    likeToggle,
    getPopularPolls,
    getPollsForUser,
    updatePoll,
    updatePollOption,
    deletePoll
}

