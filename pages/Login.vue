<template>
    <login-component
    :form="form"
    :loading="loading"
    @submit="login"
    imgname="login-illustration">
    </login-component>
</template>

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
            this.loading = true
            try {
                await this.$store.dispatch('login', form)
                this.$message.success('Вы успешно вошли в аккаунт!')
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