import axios from "axios";

// const URL = process.env.REACT_LOCALHOST;

const documentAPI = {
    getAll: () => {
        return axios.get(`http://localhost:9000/getall-document`);
    },
    findName: (obj) => {
        return axios.post(`http://localhost:9000/find-document`, obj);
    },
    findAllDocumentByType: (obj) => {
        return axios.post(`http://localhost:9000/getall-documentbytype`, obj);
    },
    findAllDocumentByName: (obj) => {
        return axios.post(`http://localhost:9000/find-documentfulltext`, obj);
    },
    increase: (obj) => {
        return axios.post(`http://localhost:9000/increase-dol`, obj);
    },
};

export default documentAPI;
