<template>
    <div class="profile">
        <div class="wrapper">
            <applicant-nav></applicant-nav>
            <div class="profile-content">
                <div class="main">
                    <el-avatar
                    :size="232"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                    </el-avatar>
                    <span>{{getFullName}}</span>
                </div>
                <profile-form
                @handleChange="handleChange"
                @onDisabled="onDisabled"
                :user="user"
                :fields="fields">
                </profile-form>
            </div>
        </div>
    </div>
</template>

<script>
import ApplicantNav from '@/components/applicant/Navigation'
import ProfileForm from '@/components/applicant/profile/form'
import { mapState } from 'vuex'
import { formItems } from '@/helpers'
import moment from 'moment'
export default {
    components: {
        ApplicantNav,
        ProfileForm
    },
    computed: {
        getFullName() {
            return `${this.storeUser.first_name} ${this.storeUser.second_name}`
        },
        ...mapState({
            storeUser: state => state.user
        })
    },
    methods: {
        async handleChange() {
            const form = {}
            this.fields.map(field => {
                form[field.id] = field.value
            })
            try {
                await this.$store.dispatch('saveEntity', {
                    entityName: 'profile',
                    method: 'put',
                    data: {
                        ...form,
                        // registration_date: moment.unix(this.user.registration_date).format('DD-MM-YYYY')
                        // registration_date: moment.unix(this.user.registration_date).format('DD-MM-YYYY')
                    }
                })
                this.onDisabled()
            } catch(e) {
                console.log(e)
            }
        },
        onDisabled(id) {
            this.fields = this.fields.map(field => {
                if (id && field.id === id) field.disabled = false
                else field.disabled = true
                return field
            })
        },
        async toDefault() {
            const { fields, user } = await this.$store.dispatch('renderObjToArray', {
                obj: this.storeUser,
                formItems
            })
            this.fields = fields
            this.user = user
        },
        renderObjToArray(obj) {
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
    },
    mounted() {
        const onClickOutside = e => {
            if (e.target.className !== 'form-input' && e.target.className !== 'change') {
                this.toDefault()
                this.onDisabled()
            }
        }
        document.addEventListener('click', onClickOutside)
        this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside))
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return await store.dispatch('renderObjToArray', {
                obj: store.state.user,
                formItems
            })
    },
}
</script>

<style lang="sass" scoped>
    .profile
        background: #f9f9f9
        min-height: 90vh
        display: flex
        &-content
            display: flex
            .main
                display: flex
                flex-direction: column
                margin-right: 100px
                align-items: center
                .el-avatar
                    margin-bottom: 30px
        .wrapper
            width: 92%
            margin: 50px auto
            background: #fff
            border-radius: 10px
            box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.11)
            display: flex
            flex-direction: column
            align-items: center
            padding: 100px

</style>