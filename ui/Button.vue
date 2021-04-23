<template>
    <el-button
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
        width: 255px
        height: 60px
        font-size: 18px
        &--info
            width: 160px
            color: #363848
            font-weight: bold
            &:hover
                color: #363848
</style>