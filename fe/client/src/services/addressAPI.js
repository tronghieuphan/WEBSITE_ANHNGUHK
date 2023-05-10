import axios from "axios";

// const URL= process.env.REACT_LOCALHOST;

const address = {
    getAll_Province: () => {
        return axios.get(`https://provinces.open-api.vn/api/p/`);
    },
    getAll_District: async (code) => {
        return await axios.get(`https://provinces.open-api.vn/api/p/${code}/?depth=2`);
    },
    getAll_Ward: (code1) => {
        return axios.get(`https://provinces.open-api.vn/api/d/${code1}/?depth=2`);
    },
};

export default address;
