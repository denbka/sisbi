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
                v-model="data.rating"
                disabled
                show-score
                score-template="{value}">
                </el-rate>
            </div>
        </div>
        <video-component>
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
                    Мы – студия дизайна интерьеров. А также мы подбираем и закупаем мебель и материалы,
                    делаем ремонт и согласовываем любые инженерные проекты.
                    Мы создаем дизайн интерьеров с 2005 года и за это время
                    наш опыт составляет более 500 реализованных проектов.
                </p>
            </div>
            <div class="footer__contacts">
                <div class="footer__contacts__contact">
                    <div class="footer__contacts__contact--header">
                        <span>Связаться</span>
                        <i class="el-icon-phone"></i>
                    </div>
                    <div class="footer__contacts__contact--contacts">

                    </div>
                </div>
                <div class="footer__contacts__handlers">
                    <el-button>Отправить резюме</el-button>
                    <el-button type="primary">Откликнуться</el-button>
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
    computed: {
        ...mapState({
            data: state => state.tempForm
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
            color: #363848
        .company-name
            font-weight: bold
            color: #636363
        &__item
            display: flex
            justify-content: space-between
    .footer
        margin-top: 20px
        height: 150%
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
            &__handlers
                flex: 0.3
                display: flex
                flex-direction: column
                button
                    margin: 0
                button:last-child
                    margin-top: 10px
</style>