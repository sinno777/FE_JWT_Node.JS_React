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
const updateRole = (data) => {
    return axios.put(`/api/v1/role/update`, { ...data })
}
const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}
const assignRolesToGroup = (data) => {
    return axios.post(`/api/v1/role/assign-to-group`, { data })
}
export {
    createNewRoles, deleteRole, fetchAllRole, updateRole, fetchRolesByGroup, assignRolesToGroup
}