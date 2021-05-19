<template>
    <div class="card-form">
        <!-- <div class="header header-header">
            <div class="header__item" v-if="data.fullData && getSender">
                <span>Отправитель: </span>
                <span>{{getSender}}</span>
            </div>
            <div class="header__item">
                <card-status
                :isResponses="isResponses"
                :status="data.fullData ? data.fullData.status : 'sended'"
                v-if="isResponses">
                </card-status>
            </div>
        </div> -->
        <video-component
        :videoSrc="`/${data.videos[0].path}`"
        :poster="data.poster ? `/${data.poster.path}` : null"
        :isRecord="false">
        </video-component>
        <div class="footer">
            <div :class="`left-block ${isProfile ? 'max-width' : ''}`">
                <div class="header">
                    <div class="header__item">
                        <h3>{{data.position}}</h3>
                        <!-- <tool-tips
                        v-if="tooltips.length"
                        class="tooltip-more">
                            <nuxt-link
                            v-if="tooltips.includes('edit')"
                            :to="`/${role}/${getEntity}/edit?entity_id=${data.id}`">
                                Редактировать
                            </nuxt-link>
                        </tool-tips> -->
                    </div>
                    <div class="header__item company">
                        <h3>{{data.company}}</h3>
                    </div>
                    <!-- <div class="header__item company">
                        <h3>{{data.first_name + ' ' + data.last_name}}</h3>
                    </div> -->
                </div>
                <div class="footer__description">
                    <div class="footer__description--info">
                        <div class="footer__description--info__item">
                            <span>Опыт работы</span>
                            <span>{{getWorkExperience}}</span>
                        </div>
                        <div class="footer__description--info__item">
                            <span>График</span>
                            <span>{{data.schedule}}</span>
                        </div>
                        <div class="footer__description--info__item">
                            <span>Зарплата</span>
                            <span>{{data.salary}}</span>
                        </div>
                        <div class="footer__description--info__item">
                            <span>Дата публикации</span>
                            <span>{{getDate}}</span>
                        </div>
                    </div>
                    <p>
                        {{data.description}}
                    </p>
                </div>
            </div>
            <div class="footer__contacts" v-if="!isProfile">
                <!-- {{`${isAuth}, ${role}`}} -->
                <modal-contacts
                v-if="isAuth"
                :role="role"
                :isAuth="isAuth"
                :tempRole="tempRole"
                :contacts="contacts"
                :data="data"
                :onOpenContacts="onOpenContacts"
                :errorContacts="errorContacts">
                </modal-contacts>
                <div class="footer__contacts__handlers">
                    <div class="footer__contacts__handlers--not-auth" v-if="!isAuth">
                        <el-button
                        type="info"
                        @click.stop="$router.push(`/register`)"
                        class="bordering-button">
                            {{tempRole === 'applicant' ? 'Отправить резюме' : 'Пригласить'}}
                        </el-button>
                    </div>
                    <div class="footer__contacts__handlers--auth" v-else>
                        <el-button
                        v-if="!isResponses && !isProfile && role === 'applicant'"
                        type="info"
                        @click.stop="onResponse(data, resumesWithoutResponse)"
                        class="bordering-button">
                            {{data.responded ? 'Вы уже откликнулись' : 'Отправить резюме'}}
                        </el-button>
                        <el-button
                        v-if="!isResponses && !isProfile && role === 'employer'"
                        @click.stop="onResponse(data, vacanciesWithoutResponse)"
                        class="card__on-response-button">
                            {{data.responded ? 'Вы уже откликнулись' : 'Пригласить'}}
                        </el-button>
                        <!-- {{!!data.fullData}}  {{data.fullData.sender }} -->
                        <el-button
                        type="primary"
                        v-if="onVerdict && data.fullData && ((data.fullData.sender === 'Employer' && role === 'applicant') || (data.fullData.sender === 'Worker' && role === 'employer'))  && data.fullData.status !== 'accepted' && data.fullData.status !== 'rejected'"
                        @click.stop="onChangeVerdict(role, data.fullData.id, 'accept')">
                            Принять
                        </el-button>
                        <el-button
                        v-if="onVerdict && data.fullData && (data.fullData.sender === 'Employer' && role === 'applicant' || data.fullData.sender === 'Worker' && role === 'employer') && data.fullData.status !== 'accepted' && data.fullData.status !== 'rejected'"
                        type="info"
                        @click.stop="onChangeVerdict(role, data.fullData.id, 'reject')"
                        class="bordering-button">
                            Отклонить
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoComponent from '@/ui/Video'
import moment from 'moment'
import ToolTips from './ComponentTooltips'
import ModalContacts from './ModalCardFormContacts'
import CardStatus from './ComponentCardStatus'
export default {
    components: {
        VideoComponent,
        ToolTips,
        ModalContacts,
        CardStatus
    },
    props: {
        onResponse: {
            type: Function,
            required: false
        },
        type: {
            type: String,
            required: false,
            default: 'info'
        },
        isResponses: {
            type: Boolean,
            required: false,
            default: false
        },
        onVerdict: {
            type: Function,
            required: false
        },
        tooltips: {
            type: Array,
            required: false,
            default: []
        },
        isProfile: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data: () => ({
        openContacts: false,
        contacts: null,
        errorContacts: false
    }),
    methods: {
        async onChangeVerdict(role, response_id, type) {
            try {
                await this.onVerdict(role, response_id, type)
                if (type === 'accept') this.openContacts = true
                if (type === 'reject') this.errorContacts = true
            } catch(e) {
                console.log(e)
            }
        },
        async onOpenContacts(role) {
            try {
                const response = await this.$axios.$get(`/${role === 'applicant' ? 'vacancies' : 'resumes'}/${this.data.id}/contacts`)
                this.contacts = response
            } catch(e) {
                console.log(e)
            }
        }
    },
    computed: {
        ...mapState({
            data: state => state.tempForm,
            role: state => state.role,
            isAuth: state => state.role ? true : false,
            tempRole: state => state.tempRole
        }),
        getWorkExperience() {
            const exp = this.data.work_experience
            if (exp === 0) return 'Без опыта'
            return exp
        },
        getDate() {
            return moment.unix(this.data.date_of_change).format('DD MMMM, YYYYг.')
        },
        getSender() {
            switch (this.data.fullData.sender) {
                case 'Worker': {
                    if (this.role === 'applicant') return 'Вы'
                } 
                case 'Employer': {
                    if (this.role === 'employer') return 'Вы'
                    else this.data.fullData.id
                } 
            }
        },
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
        myEntities() {
            return this.$store.state[this.getEntity]
        }
    }
}
</script>

<style lang="sass" scoped>
    @mixin dottedBorder($color: #8f8f8f, $orientation: horizontal, $position: top, $spacing: 5px, $size: 1px)
        background-position: $position
        @if $orientation == horizontal
            background-image: linear-gradient(to right, $color $size/$spacing * 100%, rgba(255,255,255,0) 0%)
            background-size: $spacing $size
            background-repeat: repeat-x
        @else
            background-image: linear-gradient($color $size/$spacing * 100%, rgba(255,255,255,0) 0%)
            background-size: $size $spacing
            background-repeat: repeat-y
        .ie9 &
            border-#{$position}:1px dotted $color      
    
    .card-form
        width: 800px
        height: 80vh
        margin: 25px
        overflow-y: auto
    .card-form::-webkit-scrollbar
        display: none
    .footer
        margin-top: 20px
        display: flex
        .left-block
            display: flex
            flex-direction: column
            flex: 0.7
            margin-right: 20px
        .header
            padding: 20px 0
            border-bottom: 1px solid #63636340
            display: flex
            flex-direction: column
            width: 100%
            &-header
                margin: 15px 0
            h3
                font-size: 24px
            .company-name
                font-weight: bold
                color: #636363
            &__item
                display: flex
                justify-content: space-between
                align-items: center
                color: #636363
        &__description
            width: 100%
            &--info
                display: flex
                flex-direction: column
                border-bottom: 1px solid #cfcfcf
                padding: 10px 0
                margin-bottom: 20px
                &__item
                    line-height: 38px
                    display: flex
                    margin-right: 25px
                    justify-content: space-between
                    span:first-child
                        color: #636363
                    span:last-child
                        font-weight: bold
            p
                color: #787878
        &__contacts
            flex: 0.3
            display: flex
            flex-direction: column
            &__contact
                flex: 0.7
                background: #F3F3F3
                margin-bottom: 20px
                border-radius: 8px
                &--header
                    margin: 0 10px
                    color: #636363
                    padding: 10px 0
                    border-bottom: 1px solid #cfcfcf
                    display: flex
                    justify-content: space-between
                    align-items: center
                &--contacts
                    padding: 10px
                    &--show-contacts
                        cursor: pointer
                    &--showed-contacts
                        color: #797979
                        i
                            font-weight: bold
                            margin-right: 5px
            &__handlers
                flex: 0.3
                display: flex
                flex-direction: column
                &--not-auth, &--auth
                    display: flex
                    flex-direction: column
                    button
                        width: 100%
                        height: 45px
                        margin: 0
                        margin-top: 15px
                    button:first-child
                        margin: 0
    .card__on-response-button
        color: #fff
    .max-width
        flex: 1 !important
        margin: 0 !important
    @media screen and (max-width: 900px)
        .card-form
            width: auto
            .footer
                flex-direction: column
                height: auto !important
                padding-bottom: 25px
                .left-block
                    margin-right: 0px !important
                &__contacts
                    flex-direction: row
                    &__handlers
                        flex-direction: row
                        margin-left: 25px
                &__description
                    flex: 0
                    margin-bottom: 25px
                    
                    &--info
                        flex-direction: column
                        width: 100%
                        &__item
                            width: 100%

    @media screen and (max-width: 580px)
        .card-form
            width: auto
            .footer
                &__contacts
                    flex-direction: column
                    &__handlers
                        justify-content: center
                        margin-left: 0px
                        &--not-auth, &--auth
                            flex-direction: column
                        button
                            width: 200px
    @media screen and (max-width: 450px)
        .card-form
            width: auto
            .footer
                font-size: 14px
                .header
                    h3
                        font-size: 20px
                &__contacts
                    &__handlers
                        &--not-auth, &--auth
                            width: 100%
                        button
                            width: 100%
</style>