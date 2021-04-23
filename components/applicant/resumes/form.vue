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
            v-model="form.city"
            :loading="searchLoading">
            <el-option
            :key="city.id"
            v-for="city in cities">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item
        label="Ваш опыт работы">
            <!-- <el-select
            filterable
            remote
            :remote-method="query => onSearch(query, 'cities')"
            v-model="form.city"
            :loading="searchLoading">
            <el-option
            :key="city.id"
            v-for="city in cities">
            </el-option> -->
        </el-form-item>
        <el-form-item
        label="Должность">
            <el-input></el-input>
        </el-form-item>
        <el-form-item
        label="График работы">
            <el-input></el-input>
        </el-form-item>
        <el-form-item
        label="Краткое описание">
            <el-input type="textarea"></el-input>
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
        }
    },
    computed: {
        ...mapState(['cities'])
    }
}
</script>

<style lang="sass">
    .resume-form
        width: 600px
        margin: 0 auto
</style>