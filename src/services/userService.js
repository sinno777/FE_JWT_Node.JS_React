import axios from "../setup/axios"

const registerNewUser = (email, phone, username, password) => {
    return axios.post('/api/v1/register', {
        email, phone, username, password
    })
}
const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`)
}
const deleteUser = (user) => {
    return axios.delete(`/api/v1/user/delete`, { data: { id: user.id } })
}
const fetchGroups = () => {
    return axios.get(`/api/v1/group/read`)
}
const createNewUser = (data) => {
    return axios.post(`/api/v1/user/create`, { ...data })
}
const updateCurrentUser = (data) => {
    return axios.put(`/api/v1/user/update`, { ...data })
}
export { registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroups, createNewUser, updateCurrentUser }