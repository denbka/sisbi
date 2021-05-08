<template>
    <el-form
    :model="form"
    class="card-form">
        <h3>Опыт работы</h3>
        <el-form-item
        label="Начало работы">
            <el-select
            v-model="start_date.month">
                <el-option
                :key="key"
                :value="key"
                :label="month"
                v-for="(month, key) in months">
                </el-option>
            </el-select>
            <el-input-number
            :controls="false"
            maxlength="4"
            v-model="start_date.year"
            placeholder="Год">
            </el-input-number>
        </el-form-item>
        <el-form-item
        label="Окончание">
            <el-select
            v-model="end_date.month">
                <el-option
                :key="key"
                :value="key"
                :label="month"
                v-for="(month, key) in months">
                </el-option>
            </el-select>
            <el-input-number
            :controls="false"
            maxlength="4"
            v-model="end_date.year"
            placeholder="Год">
            </el-input-number>
        </el-form-item>
        <el-form-item
        label="Организация">
            <el-input
            v-model="form.company">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Должность">
            <el-input
            v-model="form.position">
            </el-input>
        </el-form-item>
        <el-form-item
        label="Обязанности на рабочем месте">
            <el-input
            :rows="10"
            v-model="form.description"
            type="textarea">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button
            @click="onSubmit">
                Сохранить
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
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
            year: null
        },
        end_date: {
            month: null,
            year: null
        },
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
            this.$emit('save', this.form)
        }
    },
    mounted() {
        // if (this.action === 'edit') {
        //     this.form.start_date.split('-')
        //     this.form.start_date = {
        //         month: this.form.start_date[0],
        //         year: this.form.start_date[1]
        //     }
        //     this.form.end_date.split('-')
        //     this.form.end_date = {
        //         month: this.form.end_date[0],
        //         year: this.form.end_date[1]
        //     }
        // }
    },  
}
</script>

<style lang="sass" scoped>
    .card-form
        width: 800px
        min-height: 90vh
        margin: 25px
</style>