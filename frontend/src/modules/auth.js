/* eslint-disable prettier/prettier */

/*
  Adds the promise polyfill for IE 11
*/
require('es6-promise').polyfill();

export default {
    state: {
        status: null,
        token: localStorage.getItem('token') || null,
        me: localStorage.getItem('me') || null,
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_error(state) {
            state.status = 'error'
        },

        set_me(state, me) {
            state.me = me
        },
        logout(state) {
            state.status = null
            state.token = null
            state.me = null
        },
    },
    actions: {
        login({
            commit
        }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                // eslint-disable-next-line no-undef
                app.$auth.post('/oauth/token', user)
                    .then(response => {
                        const token = response.data.access_token
                        // const me = JSON.stringify(response.data.user)

                        localStorage.setItem('token', token)
                        // localStorage.setItem('me', me)

                        // eslint-disable-next-line no-undef
                        app.$auth.defaults.headers.common['Authorization'] = "Bearer " + token

                        commit('auth_success', token)
                        // commit('set_me', me)
                        resolve(response)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        // localStorage.removeItem('me')
                        reject(err)
                    })
            })
        },

        logout({
            commit
        }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('me')
                resolve()
            })
        }
    }
}