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
        return axios.post(`http://localhost:9000/create-user`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-user`, obj);
    },
    login: (obj) => {
        return axios.post(` http://localhost:9000/login`, obj);
    },
    findById: (obj) => {
        return axios.post(`http://localhost:9000/find-userbyid`, obj);
    },
    changePass: (obj) => {
        return axios.put(`http://localhost:9000/changePassword`, obj);
    },
    forgetPass: (obj) => {
        return axios.post(`http://localhost:9000/forget-password`, obj);
    },
    changePassForget: (obj) => {
        return axios.put(`http://localhost:9000/changePasswordForget`, obj);
    },
    studentRes: (obj) => {
        return axios.post(`http://localhost:9000/student-res`, obj);
    },
    findBy: (obj) => {
        return axios.post(`http://localhost:9000/find-user`, obj);
    },
};
export default userAPI;
