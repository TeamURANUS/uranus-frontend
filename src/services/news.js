import axios from "axios";

const backendUrl = "http://localhost:8081";

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
