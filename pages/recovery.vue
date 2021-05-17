<template>
    <div class="login-page">
        <div class="wrapper">
            <h3 class="title">Восстановление пароля</h3>
            <div class="form-container">
                <el-form
                v-if="step === 'enter'"
                class="main-form"
                :model="mainForm">
                    <el-form-item label="Введите номер телефона или email">
                        <el-input
                        type="email"
                        v-model="mainForm.phone">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                        type="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="$emit('submit', step, mainForm)">
                            Прислать код
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-form
                v-if="step === 'confirm'"
                :model="confirmForm">
                    <el-form-item label="Введите код">
                        <el-input
                        placeholder="Код подтверждения"
                        v-model="confirmForm.code">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                        type="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="$emit('submit', step, confirmForm)">
                            Дальше
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-form
                v-if="step === 'additional'"
                class="additional-form"
                :model="additionalForm">
                    <el-form-item label="Придумайте пароль">
                        <el-input
                        type="password"
                        v-model="additionalForm.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Повторите пароль">
                        <el-input
                        type="password"
                        v-model="additionalForm.confirmPassword">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                        type="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="$emit('submit', step, additionalForm)">
                            Зарегистрироваться
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <img
            class="illustration"
            :src="`/img/recovery.png`"
            alt="main illustration">
        </div>
    </div>
</template>

<router>
    meta:
        name: 'Восстановление пароля'
</router>

<script>
import SectionRegister from '@/components/SectionRegister'
export default {
    components: {
        SectionRegister
    },
    data: () => ({
        mainForm: {
            phone: ''
        },
        confirmForm: {
            code: ''
        },
        additionalForm: {
            password: '',
            confirmPassword: ''
        },
        loading: false,
        step: 'enter'
    }),
    computed: {
        getRole() {
            return this.$cookiz.get('tempRole') === 'applicant' ? 'Worker' : 'Employer'
        }
    },
    methods: {
        async submit(step, form) {
            this.loading = true
            try {
                await this.$store.dispatch('recovery', {
                    step,
                    form: {...form, phone: this.mainForm.phone, role: this.getRole }
                })
                switch (step) {
                    case 'enter': {
                        this.step = 'confirm'
                        return
                    }
                    case 'confirm': {
                        this.step = 'additional'
                        return
                    }
                    default: {
                        this.$router.push('/worker')
                    }
                }
            } catch(e) {
                console.log(e)
                this.loading = false
            }
            finally {
                this.loading = false
            }
        }
    }
}
</script>
<style lang="sass">
    .login-page
        display: flex
        height: 90vh
        min-height: 90vh
        .wrapper
            display: flex
            flex-direction: column
            justify-content: center
            position: relative
            height: 100%
            .login-button
                height: 50px
                box-shadow: 0 10px 25px rgba(25, 63, 246, 0.35)
            .title
                color: #11175D
                font-size: 34px
                margin-bottom: 50px
                line-height: 50px
            .form-container
                width: 400px
            .illustration
                right: 0
                position: absolute
                object-fit: contain
                z-index: -1
            .social
                display: flex
                align-items: center
                .icon
                    cursor: pointer
                    display: flex
                    width: 49px
                    height: 49px
                    justify-content: center
                    align-items: center
                    color: red
                    border-radius: 50px
                    margin-right: 25px
                    box-shadow: 5px 5px 13px 0px rgba(0, 0, 0, 0.123)
                    img
                        width: 40%
                        object-fit: contain
                .icon:first-child
                    margin-left: 25px
                .icon:last-child
                    margin-right: 0
                .icon:hover
                    background: rgba(68, 158, 255, 0.05)
    @media screen and (max-width: 1365px)
        .illustration
            width: 50%

    @media screen and (max-width: 1024px)
        .login-page
            align-items: center
            .wrapper
                align-items: center
            .title
                order: 1
            .illustration
                position: relative !important
                order: 2
                width: 100%
                height: 300px
                margin-bottom: 50px
                // object-fit: cover
            .form-container
                order: 3
            .social
                width: 400px
                justify-content: flex-start
                order: 4

    @media screen and (max-width: 768px)
        .login-page
            margin: 50px 0
            height: auto

    @media screen and (max-width: 450px)
        .login-page
            align-items: center
            .wrapper
                align-items: center
                .form-container
                    width: 100%
            .social
                width: 100%
                justify-content: center !important
            .el-form-item__content
                text-align: center
</style>