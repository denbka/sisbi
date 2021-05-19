<template>
    <div class="list-container" v-loading="listLoading" v-if="data.data">
        <div :class="`list list--${view}`" v-if="!isResponses">
            <component-card
            v-for="item in data.data"
            :key="item.id"
            :onResponse="onResponse"
            :data="item"
            :tooltips="tooltips"
            :handleDelete="handleDelete"
            :isProfile="isProfile">
            </component-card>
        </div>
        <div :class="`list list--${view}`" v-else>
            <component-card
            v-for="item in data.data"
            :key="item.id"
            :onResponse="onResponse"
            :onRead="onRead"
            :fullData="item"
            :data="item[entity]"
            :tooltips="tooltips"
            :handleDelete="handleDelete"
            :isProfile="isProfile"
            :isResponses="isResponses">
            </component-card>
        </div>
        <Pagination
        v-if="data.total > 10"
        @confirm-params="currentPage => $emit('confirm-params', currentPage)"
        :total="data.total"
        :itemsInPage="data.per_page">
        </Pagination>
        <ui-modal name="CardModal">
            <template slot-scope="{ type }">
                <modal-card-form
                :isProfile="isProfile"
                :tooltips="tooltips"
                :onVerdict="onVerdict"
                :isResponses="isResponses"
                :type="type"
                :onResponse="onResponse">
                </modal-card-form>
            </template>
        </ui-modal>
        <!-- <ui-modal name="EditCardModal">
            <template slot-scope="{ type }">
                <modal-card-form-edit
                :type="type"
                :onResponse="onResponse">
                </modal-card-form-edit>
            </template>
        </ui-modal> -->
        <ui-modal name="ResponseModal">
            <modal-response-form
            :onConfirmParams="onConfirmParams"
            :onResponse="onResponse">
            </modal-response-form>
        </ui-modal>
    </div>
    <div v-else>Не найдено элементов.</div>
</template>

<script>
import ComponentCard from './ComponentCard'
import ModalCardForm from './ModalCardForm'
import ModalCardFormEdit from './ModalCardFormEdit'
import ModalResponseForm from './ModalResponseForm'
import Pagination from '@/ui/Pagination'
import { mapState } from 'vuex'

export default {
    components: {
        ComponentCard,
        ModalCardForm,
        ModalResponseForm,
        ModalCardFormEdit,
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
        statusVisible: {
            type: Boolean,
            required: false,
            default: true
        },
        tooltips: {
            type: Array,
            required: false,
            default: []
        },
        isResponses: {
            type: Boolean,
            required: false,
            default: false
        },
        role: {
            type: String,
            required: false,
        },
        onVerdict: {
            type: Function,
            required: false
        },
        onRead: {
            type: Function,
            required: false
        },
        handleDelete: {
            type: Function,
            required: false
        },
        isProfile: {
            type: Boolean,
            required: false,
            default: false
        },
        onConfirmParams: {
            type: Function,
            required: false
        }
    },
    computed: {
        ...mapState(['view', 'listLoading']),
        entity() {
            return this.role === 'applicant' ? 'vacancy' : 'resume'
        },
    },
    async mounted() {
        console.log(this.data)
        if (this.$route.query.entity_id) {
            try {
                const response = await this.$store.dispatch('getEntities', {
                    entityName: this.$store.state.role === 'applicant' ? 'resumes' : 'vacancies',
                    id: this.$route.query.entity_id,
                    inStore: false
                })
                this.$store.commit('SET_ITEMS', {
                    entityName: 'tempForm',
                    response
                })
                this.$modal.show('CardModal')
                this.$router.replace('')
            } catch(e) {
                console.log(e)
            }
        }
    },
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
                // flex: 1 !important
                display: grid
                grid-template-columns: 1fr 1fr
                font-size: 14px
                grid-gap: 75px
                .card
                    margin: 0
                    flex-direction: column
        @media screen and (max-width: 1365px)
            .list
                flex-direction: column
                &--grid
                    grid-template-columns: 1fr
                    .card
                        flex-direction: row
        
        @media screen and (max-width: 700px)
            .list
                &--grid
                    .card
                        flex-direction: column

        // @media screen and (max-width: 1024px)
        // .list
        //     &--column
        //         grid-template-columns: 1fr

    </style>