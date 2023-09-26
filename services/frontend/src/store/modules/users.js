import axios from 'axios';

// const UNAUTHORIZED = 401;
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     const {status} = error.response;
//     if (status === UNAUTHORIZED) {
//       dispatch(logOut());
//     }
//     return Promise.reject(error);
//  }
// );


const state = {
  user: null,
  loggedIn: false,
};

const getters = {
  isAuthenticated: state => !!state.user,
  stateUser: state => state.user,
  loggedIn: state => state.loggedIn,
  logginError: state => state.logginError,
};

const actions = {
  async register({dispatch, commit}, form) {

    await axios.post('register', form);
    let UserForm = new FormData();
    UserForm.append('username', form.username);
    UserForm.append('password', form.password);
    await dispatch('logIn', UserForm);
  },
  async logIn({dispatch, commit}, user) {
    await axios.post('login', user)
    await dispatch('viewMe');
  },
  async viewMe({commit}) {
    let {data} = await axios.get('users/whoami');
    await commit('setUser', data);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteUser({}, id) {
    await axios.delete(`user/${id}`);
  },
  async logOut({commit}) {
    let user = null;
    commit('logout', user);
  }
};

const mutations = {
  setUser(state, username) {
    state.user = username;
    state.loggedIn = true;
  },
  logout(state, user){
    state.user = user;
  },
  setLogginError(state, error) {
    state.logginError = error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
