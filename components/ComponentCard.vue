<template>
    <div class="card" @click="$modal.show('CardModal')">
        <div class="img-container">
            <img
            v-if="data.img"
            :src="data.img.path">
            <Stub v-else />
        </div>
        <div class="card__info">
            <h4>{{data.position}}</h4>
            <span class="card__info__company">{{data.companyName}}</span>
            <el-rate
            v-if="true"
            :value="data.rating"
            disabled
            show-score
            score-template="{value}">
            </el-rate>
            <div class="card__info__item">
                <span>Опыт работы</span>
                <span>{{data.experience}}</span>
            </div>
            <div class="card__info__item">
                <span>График</span>
                <span>{{data.schedule}}</span>
            </div>
            <div class="card__info__item">
                <span>Зарплата</span>
                <span>{{data.salary}}</span>
            </div>
            <div class="card__info__item">
                <span>Дата публикации</span>
                <span>{{getDate}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Stub from './Stub'
import moment from 'moment'
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        Stub
    },
    computed: {
        getDate() {
            console.log(this.data)
            // return moment.unix(this.data.registration_date).format('DD-MM-YYYY')
            return 1
        }
    }
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.11)
        border-radius: 20px
        min-height: 322px
        display: flex
        margin: 25px 0
        padding: 25px
        cursor: pointer
        .img-container
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
        &:hover
            background: #fcfcfc
</style>