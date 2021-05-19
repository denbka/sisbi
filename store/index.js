export const state = () => ({
    access_token: null,
    refresh_token: null,
    user: null,
    role: null,
    tempRole: null,
    tempForm: null,
    vacancies: {
        data: []
    },
    cities: {
        data: []
    },
    responses: {
        data: []
    },
    resumes: {
        data: []
    },
    view: 'row',
    limitPagination: 10,
    listLoading: true,
    actionForm: null
})

export const getters = {
    // id: "a0147381-fa66-4b52-87d1-a50e3b387086"
    // resume: Object
    // sender: "Employer"
    // status: "bad_status"
    // vacancy: Object
    resumesWithResponses: state => {
        const { resumes, responses } = state
        return {
            ...resumes,
            data: resumes.data ? resumes.data.map(resume => {
                return {
                    ...resume,
                    response: responses.data.find(response => response.resume.id === resume.id)
                }
            }) : []
        }
    },
    vacanciesWithResponses: state => {
        const { vacancies, responses } = state
        console.log(vacancies.data)
        return {
            ...vacancies,
            data: vacancies.data ? vacancies.data.map(vacancy => {
                return {
                    ...vacancy,
                    response: responses.data.find(response => response.vacancy.id === vacancy.id)
                }
            }) : []
        }
    },
}

export const mutations = {
    SET_VIEW: (state, data) => {
        state.view = data
    },
    SET_TOKENS: (state, data) => {
        state.access_token = data ? data.access_token : null
        state.refresh_token = data ? data.refresh_token : null
    },
    SET_USER_INFO: (state, data) => {
        if (!data) {
            state.user = null
            state.role = null
            return
        }
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
    SET_VACANCY_RESPONSES: (state, vacancy_id) => {
        const { responses, vacancyResponses } = state
        vacancyResponses.data = responses.data.filter(response => response.vacancy.id === vacancy_id)
    },
    DELETE_ENTITY: (state, { entityName, id }) => {
        console.log(entityName, id)
        state[entityName].data.splice(state[entityName].data.findIndex(item => item.id === id), 1)
    }
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
        try {
            const response = await this.$axios.$post('/account/refresh_token', {
                token: this.$cookiz.get('access_token'),
                refresh_token: this.$cookiz.get('refresh_token')
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
            // console.log(response)
            commit('SET_USER_INFO', response)
        } catch(e) {
            console.log(e)
        }
    },
    logout({ commit }) {
        this.$cookiz.remove('access_token')
        this.$cookiz.remove('refresh_token')
        commit('SET_USER_INFO', null)
        commit('SET_TOKENS', null)
    },
    async register({commit, dispatch}, {
        step,
        form
    }) {
        try {
            switch (step) {
                case 'enter': {
                    await this.$axios.$post('/account/otp/send', {
                        login: form.phone,
                        type: 'SignUp'
                    })
                    return
                }
                case 'confirm': {
                    await this.$axios.$post('/account/otp/confirm', {
                        login: form.phone,
                        otp: Number(form.code)
                    })
                    return
                }
                case 'additional': {
                    try {
                        const response = await this.$axios.$post('/account/signup', {
                            login: form.phone,
                            password: form.password,
                            role: form.role
                        })
                        commit('SET_TOKENS', response)
                        this.$cookiz.set('access_token', response.access_token)
                        this.$cookiz.set('refresh_token', response.refresh_token)
                        await dispatch('getUserInfo')
                    } catch(e) {
                        console.log(e)
                    }
                    return
                }
            }
        } catch(e) {
            console.log('store error: ', e)
            throw new Error(e)
        }
    },
    async recovery({commit, dispatch}, {
        step,
        form
    }) {
        try {
            switch (step) {
                case 'enter': {
                    await this.$axios.$post('/account/password/change', {
                        login: form.phone,
                        type: 'SignUp'
                    })
                    return
                }
                case 'confirm': {
                    await this.$axios.$post('/account/otp/confirm', {
                        login: form.phone,
                        otp: Number(form.code)
                    })
                    return
                }
                case 'additional': {
                    try {
                        const response = await this.$axios.$post('/account/password/restore', {
                            login: form.phone,
                            password: form.password,
                            role: form.role
                        })
                        commit('SET_TOKENS', response)
                        this.$cookiz.set('access_token', response.access_token)
                        this.$cookiz.set('refresh_token', response.refresh_token)
                        await dispatch('getUserInfo')
                    } catch(e) {
                        console.log(e)
                    }
                    return
                }
            }
        } catch(e) {
            console.log('store error: ', e)
            throw new Error(e)
        }
    },
    async getEntities({ commit }, { entityName, $axios, stateName, params, id, inStore = true }) {
        commit('SET_ITEMS', {
            entityName: 'listLoading',
            response: true
        })
        try {
            let response
            if ($axios) {
                response = await $axios.$get(!id ? `/${entityName}` : `/${entityName}/${id}`, {
                    params
                })
            } else {
                response = await this.$axios.$get(!id ? `/${entityName}` : `/${entityName}/${id}`, {
                    params
                })
            }
            if (inStore) commit('SET_ITEMS', {
                entityName: stateName ? stateName : entityName,
                response
            })
            return response
        } catch(e) {
            console.log(e)
            throw new Error(e)
        } finally {
            commit('SET_ITEMS', {
                entityName: 'listLoading',
                response: false
            })
        }
    },
    async saveEntity({ commit }, { entityName, data, method, inStore = true, id }) {
        try {
            const response = await this.$axios[`$${method}`](!id ? `/${entityName}` : `/${entityName}/${id}`, data)
            if (inStore) commit('SET_ITEMS', {
                entityName,
                response
            })
            return response
        } catch(e) {
            // console.log(e.data)
            throw new Error(e)
        }
    },
    async removeEntity({commit}, { entityName, id, inStore = false }) {
        try {
            await this.$axios.$delete(!id ? `/${entityName}` : `/${entityName}/${id}`)
            if (inStore) commit('DELETE_ENTITY', { entityName, id })
        } catch(e) {
            // console.log(e.data)
            throw new Error(e)
        }
    },
    renderObjToArray({}, { obj, formItems }) {
        let user = JSON.parse(JSON.stringify(obj))
        const userArray = Object.entries(user)
        const fields = formItems.map(form => {
            if (form.id === 'company' && user.role !== 'employer') return
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
        }).filter(item => item !== undefined)
        return { fields, user }
    }
}