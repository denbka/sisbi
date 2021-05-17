<template>
    <el-form
    :model="form"
    class="card-form">
        <h3 class="card-form__title">Опыт работы</h3>
        <el-form-item
        class="date"
        label="Начало работы">
            <el-select
            placeholder="Выберите месяц"
            size="mini"
            v-model="start_date.month">
                <el-option
                :key="key"
                :value="key"
                :label="month"
                v-for="(month, key) in months">
                </el-option>
            </el-select>
            <el-input-number
            class="card-form__year"
            size="mini"
            :controls="false"
            maxlength="4"
            v-model="start_date.year"
            placeholder="Год">
            </el-input-number>
        </el-form-item>
        <el-form-item
        class="date end-date"
        label="Окончание">
            <el-checkbox
            @change="addCurrentDay"
            v-model="isCurrentDay">
                По настоящее время
            </el-checkbox>
            <div
            v-if="!isCurrentDay"
            class="end-date-select">
                <el-select
                placeholder="Выберите месяц"
                size="mini"
                v-model="end_date.month">
                    <el-option
                    :key="key"
                    :value="key"
                    :label="month"
                    v-for="(month, key) in months">
                    </el-option>
                </el-select>
                <el-input-number
                class="card-form__year"
                size="mini"
                :controls="false"
                maxlength="4"
                v-model="end_date.year"
                placeholder="Год">
                </el-input-number>
            </div>
        </el-form-item>
        <el-form-item
        label="Организация">
            <el-input
            placeholder="Введите название организации..."
            size="mini"
            v-model="form.company">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Должность">
            <el-input
            placeholder="Введите вашу должность..."
            size="mini"
            v-model="form.position">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Обязанности на рабочем месте">
            <el-input
            :rows="8"
            placeholder="Опишите чем занимались, с какими задачами приходилось сталкиваться..."
            v-model="form.description"
            type="textarea">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button
            type="primary"
            @click="onSubmit">
                Сохранить
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { generateID } from '@/helpers'
import moment from 'moment'
export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        action: {
            type: String,
            required: true
        }
    },
    data: () => ({
        start_date: {
            month: null,
            year: undefined
        },
        end_date: {
            month: null,
            year: undefined
        },
        isCurrentDay: false,
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    }),
    methods: {
        onSubmit() {
            {
                const { month, year } = this.start_date
                this.form.start_date = `${month}-${year}`
            }
            {
                const { month, year } = this.end_date
                this.form.end_date = `${month}-${year}`
            }
            this.form.id = generateID()
            this.$emit('save', this.form)
        },
        addCurrentDay() {
            const currentDate = new Date()
            const month = moment(currentDate).format('M')-1
            const year = moment(currentDate).format('yyyy')
            this.end_date = {
                month,
                year
            }
        }
    },
    mounted() {
        console.log(this.action)
        if (this.action === 'edit') {
            const start_date = this.form.start_date.split('-')
            console.log(start_date)
            this.start_date = {
                month: Number(start_date[0]),
                year: Number(start_date[1])
            }
            const currentDate = new Date()
            const month = moment(currentDate).format('M')-1
            const year = moment(currentDate).format('yyyy')
            const end_date = this.form.end_date.split('-')
            if (month == end_date[0] && year == end_date[1]) this.isCurrentDay = true
            this.end_date = {
                month: Number(end_date[0]),
                year: Number(end_date[1])
            }
        }
    },  
}
</script>

<style lang="sass">
    .card-form
        width: 500px
        // min-height: 
        margin: 25px
        &__title
            margin: 0 !important
            margin-bottom: 50px !important
            font-size: 28px
        &__year
            margin-left: 25px
        .el-form-item
            width: 100%
            display: flex
            flex-direction: column
            align-items: flex-start
        .el-form-item__content
            width: 100% !important
            .el-input-number
                display: flex
                align-items: center
        .end-date
            &-select
                display: flex
            .el-form-item__content
                display: flex
                flex-direction: column
    @media screen and (max-width: 900px)
        .card-form::-webkit-scrollbar
            display: none
        .card-form
            width: auto
            overflow-y: auto
            .date
                .el-form-item__content
                    &:after, &:before
                        display: none
                    .el-input-number
                        margin-left: 10px
                        order: 2
                        flex: 0.3
                    .el-select
                        order: 1
                        flex: 1
    @media screen and (max-width: 450px)
        .card-form
            .el-form-item
                margin-bottom: 15px


</style>