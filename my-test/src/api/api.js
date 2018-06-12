import axios from 'axios'

let base = 'http://127.0.0.1:8000'

export const requestSysList = params => { return axios.post(`${base}/mall/findModule`, params).then(res => res.data) }
