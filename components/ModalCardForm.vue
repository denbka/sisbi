<template>
    <div class="card-form">
        <div class="header">
            <div class="header__item">
                <h3>{{data.title}}</h3>
                <i class="el-icon-more"></i>
            </div>
            <div class="header__item">
                <span class="company-name">{{data.companyName}}</span>
                <el-rate
                :value="data.rating"
                disabled
                show-score
                score-template="{value}">
                </el-rate>
            </div>
        </div>
        <video-component
        :videoSrc="data.video"
        :isRecord="false">
        </video-component>
        <div class="footer">
            <div class="footer__description">
                <div class="footer__description--info">
                    <div class="footer__description--info__item">
                        <span>Опыт работы</span>
                        <span>{{data.experience}}</span>
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
                        <span>{{data.dateCreate}}</span>
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
                        <i class="el-icon-phone"></i>
                    </div>
                    <div class="footer__contacts__contact--contacts">
                        <span
                        v-if="!openContacts"
                        class="footer__contacts__contact--contacts--show-contacts">
                            Показать контакты
                        </span>
                        <div
                        v-else
                        class="footer__contacts__contact--contacts--showed-contacts">

                        </div>
                    </div>
                </div>
                <div class="footer__contacts__handlers">
                    <el-button
                    v-if="role === 'applicant'"
                    type="info"
                    class="bordering-button">
                        Отправить резюме
                    </el-button>
                    <el-button
                    v-if="role === 'employer' && !data.response"
                    @click.stop="onResponse(data)"
                    class="card__on-response-button">
                        {{data.response ? 'Вы уже откликнулись' : 'Откликнуться'}}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoComponent from '@/ui/Video'
export default {
    components: {
        VideoComponent,
    },
    props: {
        onResponse: {
            type: Function,
            required: false
        }
    },
    data: () => ({
        openContacts: false
    }),
    mounted() {
        console.log(this.data)
    },
    methods: {
        onOpenContacts() {
            this.$store.dispatch('getEntities', {
                entityName: ''
            })
        }
    },
    computed: {
        ...mapState({
            data: state => state.tempForm,
            role: state => state.role
        })
    }
}
</script>

<style lang="sass" scoped>
    .card-form
        width: 800px
        min-height: 90vh
        margin: 25px
    .header
        margin-bottom: 10px
        h3
            font-size: 24px
        .company-name
            font-weight: bold
            color: #636363
        &__item
            display: flex
            justify-content: space-between
    .footer
        margin-top: 20px
        height: 100%
        display: flex
        &__description
            flex: 0.7
            margin-right: 20px
            &--info
                display: flex
                flex-wrap: wrap
                border-bottom: 1px solid #cfcfcf
                padding-bottom: 10px
                margin-bottom: 20px
                &__item
                    line-height: 38px
                    display: flex
                    margin-right: 25px
                    justify-content: space-between
                    width: 40%
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
                    font-weight: bold
                    border-bottom: 1px solid #cfcfcf
                    display: flex
                    justify-content: space-between
                    align-items: center
                &--contacts
                    padding: 10px
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