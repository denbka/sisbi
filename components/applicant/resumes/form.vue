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
                type="primary"
                v-if="isWorkAtPlace"
                @click="$emit('editWorkPlace')">
                    Добавить место работы
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
                    <span>{{`${place.start_date} - ${place.end_date}`}}</span>
                </div>
                <div>
                    <h2>{{place.company}}</h2><br>
                    <span>{{place.position}}</span>
                </div>
                </el-card>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button
            size="large"
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
    data: () => ({
        schedules: ['5/2', '2/2', '3/3', 'Ночная смена', 'Гибкий'],
        isWorkAtPlace: false
    })
}
</script>

<style lang="sass">
    .resume-form
        width: 600px
        margin: 0 auto
        .submit-button
            margin: 0 auto
            border-radius: 86px
            width: 368px
            height: 60px
            font-size: 18px
        .places-of-work .el-form-item__content
            display: flex
            justify-content: space-between
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
</style>