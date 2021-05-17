<template>
    <profile-wrapper>
        <div class="main">
            <div>
                <Avatar
                :avatarSrc="user.avatar"
                />
                <span class="main__fullname">
                    {{getFullName}}
                </span>
            </div>
            <div class="location">
                <div class="location__icon">
                    <i class="el-icon-location"></i> 
                </div>
                <div class="location__info">
                    <span>{{user.address}}</span>
                </div>
            </div>
        </div>
        <profile-form
        @handleChange="handleChange"
        @onDisabled="onDisabled"
        :user="user"
        :fields="fields">
        </profile-form>
    </profile-wrapper>
</template>

<router>
    meta:
        name: 'Профиль'
</router>

<script>
import Avatar from '@/components/ComponentAvatar'
import ApplicantNav from '@/components/applicant/Navigation'
import ProfileForm from '@/components/applicant/profile/form'
import ProfileWrapper from '@/components/applicant/profile/profileWrapper'
import { mapState } from 'vuex'
import { formItems } from '@/helpers'
import moment from 'moment'
export default {
    components: {
        ApplicantNav,
        ProfileForm,
        ProfileWrapper,
        Avatar,
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

<style lang="sass">
    .profile
        background: #f9f9f9
        min-height: 90vh
        display: flex
        &-content
            display: flex
            .main
                margin-right: 80px
                text-align: center
                &__fullname
                    display: block
                    margin-top: 25px
                .el-avatar
                    margin-bottom: 30px
                .location
                    margin-top: 50px
                    display: flex
                    align-items: center
                    &__icon
                        display: flex
                        background: #ECECEC
                        padding: 8px
                        border-radius: 5px
                        i
                            color: #808080
                    &__info
                        font-size: 14px
                        font-weight: normal
                        margin-left: 10px
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