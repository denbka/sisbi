<template>
    <div class="login-page">
        <div class="wrapper">
            <h3 class="title">Начните с простой регистрации</h3>
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
        mainForm: {
            type: Object,
            required: true
        },
        confirmForm: {
            type: Object,
            required: true
        },
        additionalForm: {
            type: Object,
            required: true
        },
        imgname: {
            type: String,
            required: true
        },
        step: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
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

<style lang="sass" scoped>
    .register
        height: 90vh
        .wrapper
            display: flex
            flex-direction: column
            justify-content: center
            position: relative
            height: 90%
            .title
                color: #11175D
                font-size: 34px
                margin-bottom: 50px
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
</style>