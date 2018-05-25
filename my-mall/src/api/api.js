import axios from 'axios'

let base = 'http://127.0.0.1:8000'

export const requestSysList = params => { return axios.post(`${base}/sysList`, params).then(res => res.data) }

export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res.data) }
