<template>
    <div :class="`status status--${status ? status : 'sended'}`">
        {{getStatus}}
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: String,
            required: false
        }
    },
    computed: {
        getStatus() {
            switch (this.status) {
                case 'sended': return 'Открыта'
                case 'readed': return 'Открыта'
                case 'accepted': return 'Принято'
                case 'rejected': return 'Отказ'
                default: return 'Открыта'
            }
        },
    }
}
</script>

<style lang="sass" scoped>
    .status
        background: #30C736
        width: 130px
        height: 40px
        display: flex
        top: 27px
        justify-content: center
        align-items: center
        position: absolute
        border-radius: 40px
        left: 0
        transform: translate(-15%, -115%)
        color: #fff
        &:before
            content: '\2022'
            position: absolute
            left: 10px
            font-size: 30px
        &--rejected
            background: #c94444
        &--accepted
            background: #30C736
        &--readed
            background: #dbdbdb
    @media screen and (max-width: 700px)
        .status
            height: 30px
            width: 100px
            top: auto
            font-size: 13px
            &:before
                top: 0
                left: 5px
                font-size: 20px
</style>