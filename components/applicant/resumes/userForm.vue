<template>
    <el-form
    :model="form"
    label-position="left"
    class="resume-form">
        <el-form-item
        label="Имя">
            <el-input
            v-model="form.first_name">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Фамилия">
            <el-input
            v-model="form.second_name">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Email">
            <el-input
            v-model="form.email">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Номер телефона">
            <el-input
            v-model="form.phone">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Пол">
            <el-radio-group v-model="form.gender">
                <el-radio label="Male">Мужчина</el-radio>
                <el-radio label="Female">Женщина</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item
        label="Дата рождения">
            <el-date-picker
            v-model="form.bdate"
            @change="chang"
            format="dd-MM-yyyy"
            type="date"
            placeholder="Выберите дату">
            </el-date-picker>
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
    },
    methods: {
        chang(e) {
            console.log(e)
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
    @media screen and (max-width: 768px)
        .resume-form
            width: 100%
</style>