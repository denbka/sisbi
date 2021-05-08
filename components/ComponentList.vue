<template>
    <div class="list-container" v-loading="listLoading">
        <div :class="`list list--${view}`">
            <component-card
            v-for="item in data.data"
            :key="item.id"
            :onResponse="onResponse"
            :data="item">
            </component-card>
        </div>
        <Pagination
        v-if="data.total"
        @confirm-params="currentPage => $emit('confirm-params', currentPage)"
        :total="data.total"
        :itemsInPage="data.per_page">
        </Pagination>
        <ui-modal name="CardModal">
            <modal-card-form
            :onResponse="onResponse">
            </modal-card-form>
        </ui-modal>
        <ui-modal name="ResponseModal">
            <modal-response-form></modal-response-form>
        </ui-modal>
    </div>
</template>

<script>
import ComponentCard from './ComponentCard'
import ModalCardForm from './ModalCardForm'
import ModalResponseForm from './ModalResponseForm'
import Pagination from '@/ui/Pagination'
import { mapState } from 'vuex'

export default {
    components: {
        ComponentCard,
        ModalCardForm,
        ModalResponseForm,
        Pagination,
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        onResponse: {
            type: Function,
            required: false
        },
    },
    // watch: {
    //     'windowWidth'() {
    //         // if (this.windowWidth <= 1366) {
    //         //     this.$store.commit('SET_ITEMS', {
    //         //         entityName: 'view',
    //         //         response: 'row'
    //         //     })
    //         // } else {
    //         //     this.$store.commit('SET_ITEMS', {
    //         //         entityName: 'view',
    //         //         response: 'grid'
    //         //     })
    //         // }
    //     }
    // },
    computed: {
        ...mapState(['view', 'listLoading'])
    }
}
</script>

<style lang="sass" scoped>
    .list-container
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        .list
            display: flex
            width: 100%
            &--row
                width: 100%
                margin: 0 auto
                flex-wrap: wrap
                .card:first-child
                    margin-top: 0
            &--grid
                flex: 1 !important
                display: grid
                grid-template-columns: 1fr 1fr
                grid-gap: 50px
                .card
                    margin: 0
        @media screen and (max-width: 1365px)
            .list
                flex-direction: column
                &--grid
                    grid-template-columns: 1fr

        // @media screen and (max-width: 1024px)
        // .list
        //     &--column
        //         grid-template-columns: 1fr

    </style>