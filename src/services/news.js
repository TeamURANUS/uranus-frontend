import axios from "axios";

const backendUrl = "http://localhost:3030";

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
