<template>
    <div class="filters__item">
        <h5>{{title}}</h5>
        <div class="filter__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="sass" scoped>
    .filters__item
        margin: 25px
        h5
            margin-bottom: 30px
</style>