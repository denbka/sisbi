<template>
    <div class="card-form">
        <video-component
        :videoSrc="`/${data.videos[0].urn}`"
        :poster="data.poster ? `/${data.poster.urn}` : null"
        :isRecord="false">
        </video-component>
        <!-- <div class="header">
            <div class="header__item">
                <h3>{{data.position}}</h3>
                <tool-tips
                v-if="tooltips.length"
                class="tooltip-more">
                    <nuxt-link
                    v-if="tooltips.includes('edit')"
                    :to="`/${role}/${getEntity}/edit?entity_id=${data.id}`">
                        Редактировать
                    </nuxt-link>
                </tool-tips>
            </div>
            <div class="header__item company">
                <h3>{{data.company}}</h3>
            </div>
        </div> -->
        <div class="footer">
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
            <div class="footer__contacts">
                <div class="footer__contacts__contact">
                    <div class="footer__contacts__contact--header">
                        <span>Связаться</span>
                        <!-- <i class="el-icon-phone"></i> -->
                    </div>
                    <div class="footer__contacts__contact--contacts" v-if="role === 'applicant' || (data.fullData && data.fullData.status === 'accepted')">
                        <span
                        @click="onOpenContacts"
                        v-if="!contacts"
                        class="footer__contacts__contact--contacts--show-contacts">
                            Показать контакты
                        </span>
                        <div
                        v-else
                        class="footer__contacts__contact--contacts--showed-contacts">
                            <div
                            v-if="contacts.phone"
                            class="footer__contacts__contact--contacts--showed-contacts__item">
                                <i class="el-icon-phone"></i>
                                <span>{{contacts.phone}}</span>
                            </div>
                            <div
                            v-if="contacts.email"
                            class="footer__contacts__contact--contacts--showed-contacts__item">
                                <i class="el-icon-message"></i>
                                <span>{{contacts.email}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="footer__contacts__contact--contacts" v-if="role === 'employer' && data.fullData && data.fullData.status !== 'accepted'" style="font-size: 14px">
                        {{!errorContacts ? `Контакты будут доступны после принятия приглашения` : 'Ваше отклик был отклонен. Контакты закрыты'}}
                    </div>
                </div>
                <div class="footer__contacts__handlers">
                    <el-button
                    v-if="role === 'applicant' && !data.response && !isResponses"
                    type="info"
                    @click.stop="onResponse(data)"
                    class="bordering-button">
                        Отправить резюме
                    </el-button>
                    <el-button
                    type="primary"
                    v-if="onVerdict && data.fullData && (data.fullData.sender === 'Employer' && role === 'applicant' || data.fullData.sender === 'Employer' && role === 'applicant')  && data.fullData.status !== 'accepted' && data.fullData.status !== 'rejected'"
                    @click.stop="onChangeVerdict(role, data.fullData.id, 'accept')">
                        Принять
                    </el-button>
                    <el-button
                    v-if="onVerdict && data.fullData && (data.fullData.sender === 'Employer' && role === 'applicant' || data.fullData.sender === 'Employer' && role === 'applicant') && data.fullData.status !== 'accepted' && data.fullData.status !== 'rejected'"
                    type="info"
                    @click.stop="onChangeVerdict(role, data.fullData.id, 'reject')"
                    class="bordering-button">
                        Отклонить
                    </el-button>
                    <el-button
                    v-if="role === 'employer' && data.fullData && data.fullData.status === 'sended'"
                    @click.stop="onResponse(data)"
                    class="card__on-response-button">
                        {{data.response ? 'Вы уже откликнулись' : 'Пригласить'}}
                    </el-button>
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

export default {
    components: {
        VideoComponent,
        ToolTips
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
        async onOpenContacts() {
            try {
                const response = await this.$axios.$get(`/${this.role === 'applicant' ? 'vacancies' : 'resumes'}/${this.data.id}/contacts`)
                this.contacts = response
            } catch(e) {
                console.log(e)
            }
        }
    },
    computed: {
        ...mapState({
            data: state => state.tempForm,
            role: state => state.role
        }),
        getWorkExperience() {
            const exp = this.data.work_experience
            if (exp === 0) return 'Без опыта'
            return exp
        },
        getDate() {
            return moment.unix(this.data.date_of_change).format('DD MMMM, YYYYг.')
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
    .header
        padding: 20px 0
        border-bottom: 1px solid #63636340
        display: flex
        flex-direction: column
        h3
            font-size: 24px
        .company-name
            font-weight: bold
            color: #636363
        &__item
            display: flex
            justify-content: space-between
            align-items: center
    .footer
        margin-top: 20px
        display: flex
        &__description
            flex: 0.7
            margin-right: 20px
            &--info
                display: flex
                flex-direction: column
                border-bottom: 1px solid #cfcfcf
                padding-bottom: 10px
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
                button
                    margin: 0
                button:last-child
                    margin-top: 10px
    .card__on-response-button
        color: #fff
    @media screen and (max-width: 900px)
        .card-form
            width: auto
            .footer
                flex-direction: column
                height: auto !important
                padding-bottom: 25px
                &__contacts
                    &__handlers
                        flex-direction: row
                        button
                            width: 50%
                            margin: 0
                        button:last-child
                            margin-left: 15px
                &__description
                    flex: 0
                    margin-bottom: 25px
                    
                    &--info
                        flex-direction: column
                        width: 100%
                        &__item
                            width: 100%

    @media screen and (max-width: 900px)
        .card-form
            width: auto
            .footer
                &__contacts
                    &__handlers
                        flex-direction: column
                        button
                            width: 100%
                            margin: 0 !important

                        button:last-child
                            margin-top: 15px !important
</style>