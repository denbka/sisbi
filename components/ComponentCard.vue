<template>
    <div class="card" @click="openModal">
            <img
            :class="`poster ${view === 'grid' ? 'poster__griding' : ''}`"
            :src="data.poster ? `/${data.poster.path}` : '/img/no-image.png'">
        <div :class="`card__info ${view === 'grid' ? 'card__info__griding' : ''}`">
            <h4>{{data.position}}</h4>
            <span class="card__info__company" v-if="data.company">{{data.company}}</span>
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
        :isResponses="isResponses"
        :status="fullData ? fullData.status : 'sended'"
        v-if="statusVisible && isResponses">
        </card-status>
        <tool-tips
        v-if="tooltips.length"
        class="tooltip-more">
            <nuxt-link
            v-if="tooltips.includes('edit')"
            :to="`/${role}/${getEntity}/edit?entity_id=${data.id}`">
                Редактировать
            </nuxt-link>
            <button
            v-if="tooltips.includes('delete')"
            @click="handleDelete(data.id)">
                Удалить
            </button>
            <!-- <button @click="">Снять с публикации</button> -->
        </tool-tips>
        <!-- {{vacanciesWithoutResponse.length}} -->
        <button
        :disabled="!resumesWithoutResponse.length"
        type="success"
        v-if="!isResponses && !isProfile && role === 'applicant'"
        @click.stop="onResponse(data, resumesWithoutResponse)"
        :class="`card__on-response-button ${resumesWithoutResponse.length > 0 ? 'card__on-response-button--responded' : ''}`">
            {{!resumesWithoutResponse.length ? 'Резюме отправлено' : 'Отправить резюме'}}
        </button>
        <button
        :disabled="!vacanciesWithoutResponse.length"
        type="success"
        v-if="!isResponses && !isProfile && role === 'employer'"
        @click.stop="onResponse(data, vacanciesWithoutResponse)"
        :class="`card__on-response-button ${vacanciesWithoutResponse.length > 0 ? 'card__on-response-button--responded' : ''}`">
            {{!vacanciesWithoutResponse.length ? 'Приглашение отправлено' : 'Пригласить'}}
        </button>
    </div>
</template>

<script>
import Stub from './Stub'
import CardStatus from './ComponentCardStatus'
import ToolTips from './ComponentTooltips'
import moment from 'moment'
import Button from '~/ui/Button.vue'
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
        isResponses: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        Stub,
        CardStatus,
        ToolTips,
        Button
    },
    mounted() {
        // if (!this.isProfile) console.log(this.getEntity, this.myEntities, this.resumesWithoutResponse)
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
        resumesWithoutResponse() {
            const resumes = JSON.parse(JSON.stringify(this.myEntities.data))
            if (!this.data.responses.length) return resumes
            const keys = resumes.map((resume, key) => {
                if (this.data.responses.some(response => resume.id === response.resume.id)) return resume.id
            }).filter(item => !!item)
            console.log(keys)
            keys.map(key => resumes.splice(resumes.findIndex(resume => resume.id === key), 1))
            return resumes
        },
        vacanciesWithoutResponse() {
            const vacancies = JSON.parse(JSON.stringify(this.myEntities.data))
            console.log(vacancies)
            if (!this.data.responses.length) return vacancies
            const keys = vacancies.map((vacancy, key) => {
                if (this.data.responses.some(response => vacancy.id === response.vacancy.id)) return vacancy.id
            }).filter(item => !!item)
            keys.map(key => vacancies.splice(vacancies.findIndex(vacancy => vacancy.id === key), 1))
            return vacancies
        },
        role() {
            return this.$store.state.role
        },
        getEntity() {
            return this.role === 'applicant' ? 'resumes' : 'vacancies'
        },
        getOneEntity() {
            return this.role === 'applicant' ? 'resume' : 'vacancy'
        },
        getWorkExperience() {
            const exp = this.data.work_experience
            if (exp === 0) return 'Без опыта'
            if (exp === 1) return '1 год'
            if (exp > 1 && exp < 5) return `${exp} года`
            return `${exp} лет`
        },
        getDate() {
            return moment.unix(this.data.date_of_change).format('DD MMMM, YYYYг.')
        },
        view() {
            return this.$store.state.view
        },
        myEntities() {
            return this.$store.state[this.getEntity]
        }
    }
}
</script>

<style lang="sass" scoped>
    
    .card
        min-height: 300px
        background: #fff
        position: relative
        width: 100%
        border: 1px solid #EEEEEE
        border-radius: 20px
        display: flex
        align-items: center
        margin: 25px 0
        padding: 25px
        cursor: pointer
        transition: 0.5s ease-in-out
        .poster
            padding: 15px
            min-width: 40%
            max-width: 40%
            height: 250px
            margin-right: 32px
            object-fit: cover
            &__griding
                min-width: 100%
                max-width: 100%
                width: 100%
                margin-right: 0px !important
        &__info
            width: 60%
            text-align: center
            &__griding
                width: 100%
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
            font-size: 14px
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
    
    @media screen and (max-width: 1366px)
        .card
            .poster
                &__griding
                    margin-right: 15px !important
                    min-width: 40%
                    max-width: 40%
    @media screen and (max-width: 700px)
        .card
            height: auto
            font-size: 16px
            padding: 20px
            flex-direction: column
            padding-bottom: 30px
            .poster
                border-radius: 6px
                max-width: 100%
                min-width: 100%
                min-height: 200px
                margin-right: 0px !important
                margin-bottom: 25px
            &__info
                width: 100%
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
                width: 210px
                font-size: 11px
                &--responded
                    width: 210px

</style>