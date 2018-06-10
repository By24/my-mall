import axios from 'axios'

let base = 'http://127.0.0.1:8000'

export const requestSysList = params => { return axios.post(`${base}/sysList`, params).then(res => res.data) }

export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res.data) }

export const getUserListPage = params => { return axios.post(`${base}/users/userList`, params).then(res => res.data) }

export const batchRemoveUser = params => { return axios.post(`${base}/api/login`, params).then(res => res.data) }

export const addUser = params => { return axios.post(`${base}/api/login`, params).then(res => res.data) }
// 商品管理
export const batchRemoveGoods = params => { return axios.post(`${base}/api/login`, params).then(res => res.data) }
//商城管理
export const getFindModule = params => { return axios.post(`${base}/mall/findModule`, params).then(res => res.data) }
export const getAddModule = params => { return axios.post(`${base}/mall/addModule`, params).then(res => res.data) }
export const getEditodule = params => { return axios.post(`${base}/mall/editModule`, params).then(res => res.data) }
export const getRemoveModule = params => { return axios.post(`${base}/mall/delete`, params).then(res => res.data) }
export const getiFModule = params => { return axios.post(`${base}/mall/ifs`, params).then(res => res.data) }
