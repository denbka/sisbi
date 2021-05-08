<template>
    <el-button
    @click="$emit('click')"
    :class="`r-button r-button--${type}`"
    :type="type">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    props: {
        type: {
            required: false,
            type: String,
            default: 'primary'
        }
    }
}
</script>

<style lang="sass">
    .r-button
        border-radius: 100px
        padding: 0 50px
        height: 60px
        font-size: 18px
        &--info
            width: 160px
            color: #363848
            font-weight: bold
            &:hover
                color: #363848
    // @media screen and (max-width: 768px)
    //     .r-button
    //         margin-bottom: 25px
    //         &:last-child
    //             margin-bottom: 0
</style>