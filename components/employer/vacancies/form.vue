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
        label="Опыт работы">
                <el-select v-model="form.experience">
                    <el-option
                    v-for="experience in experiences"
                    :key="experience.value"
                    :label="experience.label"
                    :value="experience.value">
                    </el-option>
                </el-select>
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
        isWorkAtPlace: false,
        experiences: [
            { label: 'Без опыта', value: 0 },
            { label: '1 год', value: 1 },
            { label: '2 года', value: 2 },
            { label: '3 года', value: 3 },
            { label: '4 года', value: 4 },
            { label: '5 лет', value: 5 },
            { label: '6 лет', value: 6 },
            { label: '7 лет', value: 7 },
            { label: '8 лет', value: 8 },
            { label: '9 лет', value: 9 },
            { label: '10 лет', value: 10 },
        ],
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

    @media screen and (max-width: 768px)
        .resume-form
            width: 100% !important
            .el-form-item
                flex-direction: column
</style>