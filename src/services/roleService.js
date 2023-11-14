import axios from "../setup/axios"

const createNewRoles = (roles) => {
    return axios.post(`/api/v1/role/create`, [...roles])
}
const fetchAllRole = () => {
    return axios.get(`/api/v1/role/read`)
}
const deleteRole = (role) => {
    return axios.delete(`/api/v1/role/delete`, { data: { id: role.id } })
}
export {
    createNewRoles, deleteRole, fetchAllRole
}