<template>
    <div class="status">
        Открыта
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
    .status
        background: #30C736
        width: 130px
        height: 40px
        display: flex
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
    @media screen and (max-width: 700px)
        .status
            height: 30px
            width: 100px
            &:before
                left: 10px
                font-size: 25px
</style>