<template>
    <div class="login-page">
        <div class="wrapper">
            <h3 class="title">Войти в аккаунт</h3>
            <div class="form-container">
                <el-form
                class="form"
                :model="form">
                    <el-form-item label="Введите номер телефона или email">
                        <el-input
                        placeholder="Введите логин"
                        class="custom-button"
                        type="email"
                        v-model="form.login">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Введите пароль">
                        <el-input
                        class="custom-button"
                        type="password"
                        v-model="form.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <r-button
                        class="login-button"
                        type="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="$emit('submit', form)">
                            Войти
                        </r-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="social">
                or
                <span
                :class="`icon icon-${icon.id}`"
                v-for="icon in icons"
                :key="icon.id">
                    <img
                    :src="`/icons/${icon.id}.svg`"
                    :alt="`icon ${icon.id}`">
                </span>
            </div>
            <img
            class="illustration"
            :src="`/img/${imgname}.png`"
            alt="main illustration">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        },
        imgname: {
            type: String,
            required: true
        }
    },
    data: () => ({
        icons: [
            {
                id: 'google'
            },
            {
                id: 'fb'
            },
            {
                id: 'vk'
            }
        ]
    })
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