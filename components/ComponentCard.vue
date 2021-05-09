<template>
    <div class="card" @click="openModal">
        <div class="img-container">
            <img
            v-if="data.img"
            :src="data.img.path">
            <Stub v-else />
        </div>
        <div class="card__info">
            <h4>{{data.position}}</h4>
            <!-- <span class="card__info__company">{{data.companyName}}</span> -->
            <span class="card__info__company">рога и копыта</span>
            <el-rate
            v-if="true"
            :value="data.rating"
            disabled
            show-score
            score-template="{value}">
            </el-rate>
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
        <card-status>
        </card-status>
        <button
        :disabled="!!data.response"
        type="success"
        v-if="onResponse"
        @click.stop="!data.response ? onResponse(data) : null"
        class="card__on-response-button">
            {{data.response ? 'Вы уже откликнулись' : 'Откликнуться'}}
        </button>
    </div>
</template>

<script>
import Stub from './Stub'
import CardStatus from './ComponentCardStatus'
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
        }
    },
    components: {
        Stub,
        CardStatus
    },
    methods: {
        openModal() {
            this.$store.commit('SET_ITEMS', {
                entityName: 'tempForm',
                response: JSON.parse(JSON.stringify(this.data))
            })
            this.$modal.show('CardModal')
        }
    },
    computed: {
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
    
    .card
        position: relative
        width: 100%
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.11)
        border-radius: 20px
        // min-height: 322px
        display: flex
        margin: 25px 0
        padding: 25px
        cursor: pointer
        transition: 0.5s ease-in-out
        .img-container
            padding: 15px
            flex: 0.4
            height: 100%
            margin-right: 32px
        &__info
            flex: 0.6
            text-align: center
            h4
                font-size: 24px
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
    @media screen and (max-width: 700px)
        .card
            min-height: 200px
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
                font-size: 12px
                width: auto
                height: auto
                padding: 10px 30px
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
                width: 60%

</style>