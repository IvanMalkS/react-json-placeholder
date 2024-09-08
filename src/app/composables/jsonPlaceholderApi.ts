import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/';

export const jsonPlaceholderApi = () => {
    return axios.create({
        baseURL: URL,
    });
};