<template>
<div class="stub-wrapper">
    <div :class="`resume-stub resume-stub--${role}`">
        <div class="resume-stub__info">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        role: {
            type: String,
            required: true
        },
    }
}
</script>

<style lang="sass" scoped>
.stub-wrapper
    width: 80%
    margin: 100px auto
    
.resume-stub
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.11)
    border-radius: 10px
    height: 200px
    padding: 30px 100px
    background: linear-gradient(90deg, #4856D1 0%, #6375ff 31%, #4856D1 100%)
    &--applicant
        background: linear-gradient(90deg, rgba(245,146,46,1) 0%, rgba(242,115,44,1) 31%, rgba(245,146,46,1) 100%)
    &--employer
        background: linear-gradient(90deg, rgba(240,95,69,1) 0%, rgba(213,55,27,1) 31%, rgba(240,95,69,1) 100%)
    &__info
        display: flex
        flex-direction: column
        font-size: 22px
        span
            font-weight: bold
            color: #fff
            margin-left: 5px
        a
            display: flex
            justify-content: center
            align-items: center
            text-decoration: none
            background: #fff
            margin-top: 25px
            color: #38302E
            width: 300px
            font-size: 18px
            border-radius: 86px
            height: 55px
            border: 0
            &:hover
                background: #f7f7f7
</style>