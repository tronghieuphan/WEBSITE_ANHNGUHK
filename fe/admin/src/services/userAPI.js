import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const userAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-user`);
    },
    getAllTypeUser: (obj) => {
        return axios.post(`http://localhost:9000/getByType-user`, obj);
    },
    getUserBy: (obj) => {
        return axios.post(`http://localhost:9000/getUser-by`, obj);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-useradmin`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-user`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-user/${id}`);
    },
    login: (obj) => {
        return axios.post(` http://localhost:9000/login`, obj);
    },
    findById: (obj) => {
        return axios.post(`http://localhost:9000/find-userbyid`, obj);
    },
    updateActive: (obj) => {
        return axios.post(`http://localhost:9000/update-active`, obj);
    },
    changePass: (obj) => {
        return axios.put(`http://localhost:9000/changePassword`, obj);
    },
    find: (obj) => {
        return axios.post(`http://localhost:9000/find-user`, obj);
    },
    
};

export default userAPI;
