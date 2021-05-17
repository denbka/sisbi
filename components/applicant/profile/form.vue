<template>
    <el-form
    :model="user"
    class="profile-form">
        <form-item
        v-for="field in fields"
        :key="field.id"
        @handleChange="$emit('handleChange')"
        @onDisabled="$emit('onDisabled', field.id)"
        :field="field">
        </form-item>
    </el-form>
</template>

<script>
import FormItem from './formItem'
export default {
    components: {
        FormItem
    },
    props: {
        fields: {
            type: Array,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        
    }
}
</script>

<style lang="sass">
    .profile-form
        .el-form-item
            &__content
                display: flex
                justify-content: space-between
                width: 500px
                font-size: 16px
                input
                    padding-left: 15px
                    border: 1px solid #C2C2C2
                    border-radius: 60px
                .el-select
                    width: 151px
                    input
                        color: #636363 !important
                        border: 1px solid #C2C2C2 !important
                    input:disabled
                        background: #FBFBFB !important
                .title
                    font-weight: bold
                    min-width: 200px
                .change
                    text-decoration: underline
                    margin-left: 30px
                    color: #C2C2C2
                    cursor: pointer
                .action
                    display: flex
                    justify-content: space-between
                &::before, &::after
                    display: none
                    content: ''
    @media screen and (max-width: 580px)
        .profile-form
            width: 100%
        .el-form-item
            &__content
                flex-direction: row
                flex-wrap: wrap
                width: 100% !important
                .title
                    order: 0
                    width: 50%
                .form-input
                    order: 2
                    width: 100%
                    height: 40px !important
                .el-select
                    order: 2
                    width: 100% !important
                .change
                    order: 1
                    width: 50%
</style>