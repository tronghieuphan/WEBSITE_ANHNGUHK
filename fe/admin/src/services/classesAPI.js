import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const classesAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-classes`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-classes`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-classes`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-classes/${id}`);
    },
    findInfo: (obj) => {
        return axios.post(`http://localhost:9000/find-infoclasses`, obj);
    },
    getListStudentClasses: (obj) => {
        return axios.post(`http://localhost:9000/get-liststudentclasses`, obj);
    },
    getListLecClas: (obj) => {
        return axios.post(`http://localhost:9000/getall-classesteacher`, obj);
    },
    sendMailAll: (obj) => {
        return axios.post(`http://localhost:9000/send-emailcalender`, obj);
    },
    move: (obj) => {
        return axios.post(`http://localhost:9000/move-student`, obj);
    },
    findAllClasses: (obj) => {
        return axios.post(`http://localhost:9000/findall-classe`, obj);
    },
    uploadActive: (obj) => {
        return axios.post(`http://localhost:9000/upload-active`, obj);
    },
};
export default classesAPI;
