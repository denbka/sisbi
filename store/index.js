export const state = () => ({
    access_token: null,
    refresh_token: null,
    user: null,
    role: null,
    tempRole: null,
    tempForm: {
        id: 1,
        title: 'Дизайнер интерьера',
        companyName: 'Auslogics Labs',
        rating: 4.3,
        experience: '1-3 года',
        schedule: '5/2, с 9-00 до 18-00',
        salary: '20 000 - 30 000',
        dateCreate: '03.05.2021',
    },
    vacancies: [],
    cities: [],
    // vacancies: [
    //     {
    //         id: 1,
    //         title: 'Дизайнер интерьера',
    //         companyName: 'Auslogics Labs',
    //         rating: 4.3,
    //         experience: '1-3 года',
    //         schedule: '5/2, с 9-00 до 18-00',
    //         salary: '20 000 - 30 000',
    //         dateCreate: '03.05.2021'
    //     },
    // ]
})

export const getters = () => ({
    // auth: state => {
    //     return Boolean(user
    // }
})

export const mutations = {
    SET_TOKENS: (state, data) => {
        state.access_token = data.access_token
        state.refresh_token = data.refresh_token
    },
    SET_USER_INFO: (state, data) => {
        state.user = {
            ...data,
            role: data.role === 'Worker' ? 'applicant' : 'employer'
        }
        state.role = state.user.role.toLowerCase()
    },
    SET_TEMP_ROLE: (state, role) => {
        state.tempRole = role
    },
    SET_ITEMS: (state, { entityName, response }) => {
        state[entityName] = response
    },
    increment: (state) => {
        state.count++
    },
}

export const actions = {
    async nuxtServerInit({ state, commit, dispatch }, { $cookiz, $axios, $storage, store, route }) {
        if ($cookiz.get('access_token') && $cookiz.get('refresh_token')) {
                commit('SET_TOKENS', {
                access_token: $cookiz.get('access_token'),
                refresh_token: $cookiz.get('refresh_token')
            })
            await dispatch('getUserInfo', $axios)
        }
    },
    async refreshToken({ state, commit }) {
        const { access_token, refresh_token } = state
        try {
            const response = await this.$axios.$post('/account/refresh_token', {
                token: access_token,
                refresh_token
            })
            console.log('refreshToken')
            this.$cookiz.set('access_token', response.access_token)
            this.$cookiz.set('refresh_token', response.refresh_token)
            commit('SET_TOKENS', response)
        } catch(e) {
            throw new Error(e)
            console.log(e)
        }
    },
    async login({ commit, dispatch }, form) {
        try {
            const response = await this.$axios.$post('/account/signin', form)
            commit('SET_TOKENS', response)
            this.$cookiz.set('access_token', response.access_token)
            this.$cookiz.set('refresh_token', response.refresh_token)
            // await dispatch('getUserInfo')
        } catch(e) {
            console.log('store error: ', e)
            throw new Error(e)
        }
    },
    async getUserInfo({ commit }, $axios) {
        try {
            let response
            if ($axios) response = await $axios.$get('/profile')
            else response = await this.$axios.$get('/profile')
            commit('SET_USER_INFO', response)
        } catch(e) {
            console.log(e)
        }
    },
    async register({commit}, {
        step,
        form
    }) {
        try {
            switch (step) {
                case 'enter': {
                    await this.$axios.post('/account/otp/send', {
                        login: form.phone,
                        type: 'SignUp'
                    })
                    return
                }
                case 'confirm': {
                    await this.$axios.post('/account/otp/confirm', {
                        login: form.phone,
                        otp: Number(form.code)
                    })
                    return
                }
                case 'additional': {
                    await this.$axios.post('/account/signup', {
                        login: form.phone,
                        password: form.password,
                        role: form.role
                    })
                    return
                }
            }
        } catch(e) {
            console.log('store error: ', e)
            throw new Error(e)
        }
    },
    async getEntities({ commit }, { entityName, $axios = null, params = {} }) {
        try {
            let response
            if ($axios) {
                response = await $axios.$get(`/${entityName}`, params)
            } else {
                response = await this.$axios.$get(`/${entityName}`, params)
            }
            commit('SET_ITEMS', {
                entityName,
                response: response.data
            })
        } catch(e) {
            console.log(e)
            throw new Error(e)
        }
    },
    async saveEntity({ commit }, { entityName, data, method }) {
        try {
            const response = await this.$axios[`$${method}`](`/${entityName}`, data)
            commit('SET_USER_INFO', response)
            return response
        } catch(e) {
            console.log(e.message)
        }
    },
    renderObjToArray({}, { obj, formItems }) {
        let user = JSON.parse(JSON.stringify(obj))
        const userArray = Object.entries(user)
        const fields = formItems.map(form => {
            if (userArray.some(item => item[0] === form.id)) {
                const userProp = userArray.find(item => item[0] === form.id)
                return {
                    id: userProp[0],
                    value: userProp[1],
                    title: form.title,
                    disabled: true,
                    type: 'normal'
                }
            }
            return {
                    id: form.id,
                    value: null,
                    title: form.title,
                    disabled: true,
                    type: form.id
                }
        })
        return { fields, user }
    }
}