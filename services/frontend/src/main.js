import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://mellowsky.arec.me/api/';  // the FastAPI backend
// axios.defaults.baseURL = 'http://mellowsky:5000/';  // the FastAPI backend


axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('logOut');
      if (error.response.data.detail == 'Not authenticated') {
        router.push({name: 'Login'});
      } else {
        return Promise.reject(error);
      }
    }
  }
});

app.use(router);
app.use(store);
app.mount("#app");
