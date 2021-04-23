<template>
    <header class="header">
        <div class="wrapper">
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
        </div>
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
        position: relative
        .wrapper
            display: flex
            flex-direction: column
            justify-content: center
            position: relative
            .utp
                height: 100%
                margin-top: -25px
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
                right: 0
                position: absolute
                object-fit: contain
                z-index: -1

</style>