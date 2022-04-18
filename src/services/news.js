import axios from "axios";
import config from './conf.js';

const backendUrl = `http://${config.backend}:8081`;

export const getNews = async () => {
    return await axios({
        method: 'get',
        url: backendUrl + '/api/news'
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};
