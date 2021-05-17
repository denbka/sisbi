<template>
    <header class="header">
        <div class="utp">
            <h1 class="utp__title">
                <slot name="title"></slot>
            </h1>
            <span class="utp__subtitle">
                <slot name="subtitle"></slot>
            </span>
            <div class="handlers">
                <r-button>Добавить резюме</r-button>
                <change-role></change-role>
            </div>
        </div>
        <img
        class="illustration"
        :src="`/img/${imgname}.png`"
        alt="main illustration">
    </header>
</template>

<script>
import ChangeRole from '@/components/ChangeRole'

export default {
    components: {
        ChangeRole
    },
    props: {
        imgname: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="sass" scoped>
    
    .header
        height: 90vh
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        position: relative
        .utp
            height: 100%
            display: flex
            flex-direction: column
            justify-content: center
            &__title
                font-size: 60px
                line-height: 80px
                mark
                    color: #346BF6
                    background: transparent
            &__subtitle
                display: inline-block
                padding: 24px 0 60px 0
            .handlers
                display: flex
                align-items: center
                button
                    margin-right: 50px
        .illustration
            width: 50%
            // height: 50%
            // top: 13%
            right: 0
            position: absolute
            object-fit: cover
            z-index: -1

    @media screen and (max-width: 1365px)
        .illustration
            display: none
    
    @media screen and (max-width: 1024px)
        .header
            height: auto
            margin: 100px 0
            .utp
                height: 100%
                margin-top: 0px
                text-align: center
                display: flex
                flex-direction: column
                justify-content: center
                &__title
                    font-size: 44px !important
                    line-height: 60px !important
                .handlers
                    flex-direction: column
                    .el-button
                        margin: 0 !important
                        margin-bottom: 25px !important

    @media screen and (max-width: 600px)
        .header
            margin-top: 50px
            .utp
                font-size: 12px
                &__title
                    font-size: 30px !important
                    line-height: 40px !important
</style>