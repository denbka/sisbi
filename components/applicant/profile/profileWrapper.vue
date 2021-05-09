<template>
    <div class="profile">
        <div class="wrapper">
            <applicant-nav class="profile-nav"></applicant-nav>
            <div :class="`profile-content ${contentClass ? contentClass : ''}`">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import ApplicantNav from '@/components/applicant/Navigation'
import { mapState } from 'vuex'
import { formItems } from '@/helpers'
import moment from 'moment'
export default {
    props: {
        contentClass: {
            type: String,
            required: false
        }
    },
    components: {
        ApplicantNav
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
            width: 100%
            justify-content: center
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
    @media screen and (max-width: 1024px)
        .profile
            .wrapper
                padding: 0
                width: 100%
                margin: 50px 25px
                background: transparent
                box-shadow: none
            &-content
                flex-direction: column
                align-items: center
                .main
                    margin: 0 auto
                    margin-bottom: 50px
        .profile-nav
            display: none

</style>