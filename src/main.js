//imports
import { createApp } from 'vue'
import {createPinia} from 'pinia'
const pinia = createPinia()
//element+
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//vue methods
import App from './App.vue'
import components from '@/components/UI/index';
import router from "@/router/router";
import axios from "axios"
import { VueCookieNext} from "vue-cookie-next";

//app instance
const app = createApp(App)
//Global registration of custom UI Components
components.forEach(item => {
    app.component(item.name, item.component)

})
//global registration of Element+ icons
Object.entries(ElementPlusIconsVue).forEach( item => {
    app.component(item[0], item[1])
})
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')

import {useUserStore} from "@/stores/useUserStore"
const user = useUserStore()

axios.defaults.baseURL = process.env.VUE_APP_API_URL

// Set Authorization header for each request from cookies
axios.interceptors.request.use(
    // Modify the request config before it's sent
    config => {
        const access = VueCookieNext.getCookie("accessToken");
        if (access)
            config.headers['Authorization'] = "Bearer " + access
        return config;
    })

// Flag to track whether authorization is in progress (to prevent recursive calling)
let isAuthorizationInProgress = false;

// Useful for 401 response
axios.interceptors.response.use(
    // Success handler, simply return the response
    response => response,
    // Error handler
    async error => {
        console.log("Try to repair error response")
        const originalRequest = error.config;

        // If the error is due to unauthorized access and retry hasn't been attempted
        if (error.response.status === 401 && !originalRequest._retry && !isAuthorizationInProgress) {
            isAuthorizationInProgress = true;

            // Check if refresh token didn't expire
            const refresh = VueCookieNext.getCookie('refreshToken');
            if (refresh) {
                originalRequest._retry = true;
                // Refresh tokens
                try {
                    const response = await axios.post('token/refresh/', {
                        refresh: refresh
                    });
                    console.log("successful refresh after 401");

                    // Save access token
                    const access = response.data.access;
                    VueCookieNext.setCookie("accessToken", access);
                    // Set the new access token in the request headers
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;

                    // Retry the original request with the new access token
                    return axios(originalRequest);
                } catch (refreshError) {
                    await user.handleRefreshError();
                    console.log("401 and error while refreshing token:", refresh, refreshError.data);
                    return Promise.reject(refreshError);
                } finally {
                    isAuthorizationInProgress = false;
                }
            } else {
                await user.handleRefreshError();
                console.log("401 and no refresh token");
                return Promise.reject(error);
            }
        }
        // Reject the promise with the error
        return Promise.reject(error);
    }
);