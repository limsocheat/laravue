/* eslint-disable prettier/prettier */
import Vue from "vue";
import axios from "axios";

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const auth = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // data: {
    //     grant_type: process.env.VUE_APP_GRANT_TYPE,
    //     client_id: process.env.VUE_APP_CLIENT_ID,
    //     client_secret: process.env.VUE_APP_CLIENT_SECRET
    // },
    headers: {
        'Content-Type': 'application/json',
    }
});

auth.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};

Vue.prototype.$http = http;
Vue.prototype.$auth = auth;

const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$auth.defaults.headers.common['Authorization'] = "Bearer " + token
    
}