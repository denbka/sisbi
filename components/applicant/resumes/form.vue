<template>
    <el-form
    :model="form"
    label-position="left"
    class="resume-form">
        <el-form-item
        label="Заработная плата">
            <el-input
            v-model="form.salary"
            type="number">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Город">
            <el-select
            filterable
            remote
            :remote-method="query => onSearch(query, 'cities')"
            v-model="form.city_id"
            :loading="searchLoading">
            <el-option
            :key="city.id"
            :label="city.name"
            :value="city.id"
            v-for="city in cities.data">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item
        label="Должность">
            <el-input
            v-model="form.position">
            </el-input>
        </el-form-item>
        <el-form-item
        label="График работы">
            <el-select
            v-model="form.schedule">
                <el-option
                :key="schedule"
                :label="schedule"
                :value="schedule"
                v-for="schedule in schedules">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item
        label="Краткое описание">
            <el-input
            :rows="10"
            type="textarea"
            v-model="form.description">
            </el-input>
        </el-form-item>
        <el-form-item
        class="places-of-work"
        label="Ваш опыт работы">
                <el-switch
                v-model="isWorkAtPlace">
                </el-switch>
                <el-button
                class="add"
                type="primary"
                size="mini"
                v-if="isWorkAtPlace"
                @click="$emit('editWorkPlace')">
                    <i class="el-icon-plus"></i>
                </el-button>
                <div v-else></div>
        </el-form-item>
        <el-form-item
        class="el-cards">
            <div
            :key="key"
            v-for="(place, key) in places_of_work"
            @click="$emit('editWorkPlace', { ...place, key })"
            class="el-card-container">
                <el-card
                class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{`${renderDate(place.start_date)} - ${renderDate(place.end_date)}`}}</span>
                    <div class="icon" @click.stop="$emit('onRemovePlace', place)">
                        <i class="el-icon-delete"></i>
                    </div>
                </div>
                <div>
                    <h2>{{place.company}}</h2>
                    <span>{{place.position}}</span>
                    <p>{{place.description}}</p>
                </div>
                </el-card>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button
            type="primary"
            class="submit-button"
            @click="$emit('onSubmit')">
                Продолжить
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { SelectMixin } from '@/mixins'
import { mapState } from 'vuex'
export default {
    mixins: [
        SelectMixin
    ],
    props: {
        action: {
            type: String,
            required: true
        },
        form: {
            type: Object,
            required: true
        },
        places_of_work: {
            type: Array,
            required: false
        }
    },
    computed: {
        ...mapState(['cities']),
    },
    methods: {
        renderDate(date) {
            console.log(date)
            const splitDate = date.split('-')
            return `${this.months.find((item, key) => key === Number(splitDate[0]))}, ${splitDate[1]}г.`
        }
    },
    mounted() {
        if (this.places_of_work.length) this.isWorkAtPlace = true
        else this.isWorkAtPlace = false
    },
    data: () => ({
        schedules: ['5/2', '2/2', '3/3', 'Ночная смена', 'Гибкий'],
        isWorkAtPlace: false,
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    })
}
</script>

<style lang="sass">
    .resume-form
        width: 600px
        margin: 0 auto
        .submit-button
            margin: 25px auto
            border-radius: 86px
            width: 250px
            height: 50px
            font-size: 16px
        .places-of-work .el-form-item__content
            display: flex
            align-items: center
            justify-content: space-between
            &::before, &::after
                display: none
            .add
                border-radius: 50px
                padding: 10px
            button
                margin: 0
        .el-cards .el-form-item__content
            display: flex
            flex-direction: column
            width: 100%
            .el-card
                flex: 1
                margin-top: 25px
                cursor: pointer
                p
                    overflow: hidden
                    -webkit-box-orient: vertical
                    line-height: 30px
                    text-overflow: ellipsis
                    display: -webkit-box
                    -webkit-line-clamp: 2
                &__header .clearfix
                    display: flex
                    align-items: center
                    justify-content: space-between
                    .icon
                        display: flex
                        background: #F05F3F
                        height: 34px
                        width: 34px
                        color: #fff
                        border-radius: 50px
                        i
                            margin: auto
                            display: flex
                            align-items: center
                            
</style>