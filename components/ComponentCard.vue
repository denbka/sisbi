<template>
    <div class="card" @click="openModal">
        <div :class="`img-container ${view === 'grid' ? 'img-container__griding' : ''}`">
            <img
            v-if="false">
            <Stub v-else />
            <!-- `/${data.poster.urn}` -->
        </div>
        <div class="card__info">
            <h4>{{data.position}}</h4>
            <span class="card__info__company" v-if="data.companyName">{{data.companyName}}</span>
            <div style="margin-top: auto">
                <div class="card__info__item">
                    <span>Опыт работы</span>
                    <span>{{getWorkExperience}}</span>
                </div>
                <div class="card__info__item">
                    <span>График</span>
                    <span>{{data.schedule}}</span>
                </div>
                <div class="card__info__item">
                    <span>Зарплата</span>
                    <span>{{data.salary}} руб.</span>
                </div>
                <div class="card__info__item">
                    <span>Дата публикации</span>
                    <span>{{getDate}}</span>
                </div>
            </div>
        </div>
        <card-status
        :status="fullData ? fullData.status : 'sended'"
        v-if="statusVisible">
        </card-status>
        <tool-tips
        v-if="tooltips.length"
        class="tooltip-more">
            <nuxt-link
            v-if="tooltips.includes('edit')"
            :to="`/${role}/${getEntity}/edit?entity_id=${data.id}`">
                Редактировать
            </nuxt-link>
            <!-- <button @click="">Снять с публикации</button> -->
        </tool-tips>
        <button
        :disabled="data.responded"
        type="success"
        v-if="onResponse"
        @click.stop="!data.response ? onResponse(data) : null"
        :class="`card__on-response-button ${data.responded ? 'card__on-response-button--responded' : ''}`">
            {{data.responded ? 'Вы уже откликнулись' : 'Откликнуться'}}
        </button>
    </div>
</template>

<script>
import Stub from './Stub'
import CardStatus from './ComponentCardStatus'
import ToolTips from './ComponentTooltips'
import moment from 'moment'
export default {
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
        fullData: {
            type: Object,
            required: false
        },
        onRead: {
            type: Function,
            required: false
        }
    },
    components: {
        Stub,
        CardStatus,
        ToolTips
    },
    methods: {
        async openModal(type) {
            this.$store.commit('SET_ITEMS', {
                entityName: 'tempForm',
                response: !this.fullData 
                ? JSON.parse(JSON.stringify(this.data))
                : JSON.parse(JSON.stringify({...this.data, fullData: this.fullData}))
            })
            if (this.fullData && this.fullData.status === 'sended') await this.onRead(this.role, this.fullData.id)
            this.$modal.show(type === 'edit' ? 'EditCardModal' : 'CardModal', { type })
        }
    },
    computed: {
        role() {
            return this.$store.state.role
        },
        getEntity() {
            return this.role === 'applicant' ? 'resumes' : 'vacancies'
        },
        getWorkExperience() {
            const exp = this.data.work_experience
            if (exp === 0) return 'Без опыта'
            return exp
        },
        getDate() {
            return moment.unix(this.data.date_of_change).format('DD MMMM, YYYYг.')
        },
        view() {
            return this.$store.state.view
        }
    }
}
</script>

<style lang="sass" scoped>
    
    .card
        min-height: 300px
        position: relative
        width: 100%
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.11)
        border-radius: 20px
        display: flex
        align-items: center
        margin: 25px 0
        padding: 25px
        cursor: pointer
        transition: 0.5s ease-in-out
        .img-container
            padding: 15px
            flex: 0.4
            height: 100%
            width: 100%
            margin-right: 32px
            img
                // height: 100%
                // width: 100%
                object-fit: cover
            &__griding
                margin-right: 0px !important
        &__info
            flex: 0.6
            width: 100%
            text-align: center
            h4
                font-size: 24px
                margin-bottom: 15px
            &__company
                font-size: 18px
                color: #636363
                display: block
                margin-bottom: 10px
            &__item
                line-height: 38px
                display: flex
                justify-content: space-between
                span:first-child
                    color: #636363
                span:last-child
                    font-weight: bold
        &__on-response-button
            cursor: pointer
            font-size: 16px
            color: #fff
            border: 0
            border-radius: 4px
            width: 225px
            height: 40px
            position: absolute
            bottom: -40px
            transform: translate(-50%, -50%)
            left: 50%
        &:hover
            background: #fcfcfc
    .tooltip-more
        position: absolute
        right: 0
        top: 0
        font-weight: bold
        font-size: 20px

    @media screen and (max-width: 700px)
        .card
            height: auto
            font-size: 16px
            padding: 20px
            flex-direction: column
            padding-bottom: 30px
            .img-container
                flex: 0.3
                background: linear-gradient(0deg, #EEF0F3, #EEF0F3)
                border-radius: 6px
                width: 100%
                min-height: 200px
                margin-right: 0px !important
                margin-bottom: 25px
            &__info
                flex: 0.7
                display: flex
                flex-direction: column
                h4
                    font-size: 20px
                    line-height: 20px
                &__company
                    font-size: 12px
                    line-height: 20px
                    margin-bottom: 0
                &__item
                    line-height: 24px
            &__on-response-button
                width: 250px
                font-size: 12px
                width: auto
                height: auto
                padding: 2px 30px
                position: absolute
                bottom: -32px
                transform: translate(-50%, -50%)

    @media screen and (max-width: 420px)
        .card
            font-size: 12px
            &__info
                h4
                    font-size: 18px
            &__on-response-button
                width: 190px
                &--responded
                    width: 190px

</style>