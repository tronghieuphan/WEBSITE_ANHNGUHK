import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const documentAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-document`);
    },
    create: (obj) => {
        return axios.post(`http://localhost:9000/create-document`, obj);
    },
    update: (obj) => {
        return axios.put(`http://localhost:9000/update-document`, obj);
    },
    delete: (id) => {
        return axios.delete(`http://localhost:9000/delete-document/${id}`);
    }, findAllDocumentByName: (obj) => {
        return axios.post(`http://localhost:9000/find-documentfulltext`, obj);
    },
};

export default documentAPI;
