<template>
    <login-component
    :form="form"
    :loading="loading"
    @submit="login"
    imgname="login-illustration">
    </login-component>
</template>

<router>
    meta:
        name: 'Вход'
</router>

<script>
import LoginComponent from '@/components/SectionLogin'
export default {
    components: {
        LoginComponent
    },
    data() {
        return {
            form: {
                login: '',
                password: ''
            },
            loading: false
        }
    },
    methods: {
        async login(form) {
            console.log(123)
            this.loading = true
            try {
                await this.$store.dispatch('login', form)
                this.$router.push('/applicant')
            } catch(e) {
                console.log(e.message)
            }
            finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>