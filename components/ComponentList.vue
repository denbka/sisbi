<template>
    <div :class="`list list--${view}`">
        <component-card
        v-for="item in data"
        :key="item.id"
        :data="item">
        </component-card>
        <ui-modal name="CardModal">
            <modal-card-form></modal-card-form>
        </ui-modal>
    </div>
</template>

<script>
import ComponentCard from './ComponentCard'
import ModalCardForm from './ModalCardForm'
export default {
    components: {
        ComponentCard,
        ModalCardForm
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        view: {
            type: String,
            required: false,
            default: 'column'
        }
    }
}
</script>

<style lang="sass" scoped>
    .list
        display: flex
        &--row
            width: 70%
            margin: 0 auto
            flex-wrap: wrap
        &--column
            display: grid
            grid-template-columns: 1fr 1fr
            grid-gap: 50px
            .card
                margin: 0
</style>