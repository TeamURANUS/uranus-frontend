import axios from "axios";
import config from './conf.js';

const backendUrl = `http://${config.backend}:8081`;

export const register = async (email, password) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/auth/register',
        data: {
            email: email,
            password: password
        }
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const login = async (email, password) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/auth/login',
        data: {
            email: email,
            password: password
        }
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};


export const forgotPassword = async (email) => {
    return await axios({
        method: 'post',
        url: backendUrl + '/api/auth/resetPassword',
        data: {
            email: email
        }
    }).then(result => {
        return result;
    }).catch(error => {
        return error.response;
    });
};



