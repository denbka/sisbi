<template>
    <div
    class="filters">
        <!-- <div
        @click="isOpen = !isOpen"
        class="filters__header">
            <h4>Фильтры</h4>
        </div> -->
        <el-collapse v-model="isOpen">
            <el-collapse-item name="test">
                <template slot="title">
                    <div
                    class="filters__header">
                        <h4>Фильтры</h4>
                    </div>
                </template>
                <el-divider></el-divider>
                <filter-item
                v-if="cities"
                title="Город">
                    <el-checkbox-group
                    v-model="filters.cities">
                        <el-checkbox
                        v-for="city in cities"
                        :label="city.id"
                        :key="city.id">
                            {{city.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </filter-item>
                <filter-item
                v-if="filters.work_exp"
                title="Опыт работы">
                        <el-slider
                        v-model="filters.work_exp"
                        range
                        :step="1"
                        :max="10">
                        </el-slider>
                        <span v-if="filters.work_exp[1] !== 0">{{renderWorkExp}}</span>
                        <span v-else>Без опыта</span>
                </filter-item>
                <filter-item
                title="Зарплата">
                    <el-slider
                    v-model="filters.salary"
                    range
                    :step="10000"
                    :max="350000">
                    </el-slider>
                    <span>{{renderSalary}}</span>
                </filter-item>
                <div class="buttons">
                    <el-button
                    type="primary"
                    class="confirm-button"
                    @click="$emit('confirm-params')">
                        Применить
                    </el-button>
                    <el-button
                    type="info"
                    @click="$emit('confirm-params', true)">
                        Сбросить
                    </el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import FilterItem from './FilterItem'
export default {
    data: () => ({
        isOpen: []
    }),
    components: {
        FilterItem
    },
    props: {
        filters: {
            type: Object,
            required: true
        },
        cities: {
            type: Array,
            required: false
        },
    },
    mounted() {
        if (this.windowWidth >= 1024) {
            this.isOpen = 'test'
        } 
    },
    computed: {
        renderWorkExp() {
            if (this.filters.work_exp[0] === this.filters.work_exp[1]) {
                if (this.filters.work_exp[0] === 1) return `1 год`
                if (this.filters.work_exp[0] >= 2 && this.filters.work_exp[0] <= 4) return `${this.filters.work_exp[0]} года`
                if (this.filters.work_exp[0] >= 5 && this.filters.work_exp[0] <= 10) return `${this.filters.work_exp[0]} лет`
            }
            return `от ${this.filters.work_exp[0]} до ${this.filters.work_exp[1]} лет`
        },
        renderSalary() {
            if (this.filters.salary[1] === 0) return 'Любая'
            if (this.filters.salary[0] === this.filters.salary[1]) return `${this.filters.salary[0]}р`
            else return `от ${this.filters.salary[0]}р до ${this.filters.salary[1]}р`
        }
    }
}
</script>

<style lang="sass">
    .filters
        flex: 0.2
        margin-left: 50px
        box-shadow: 0px 10px 40px rgb(0 0 0 / 11%)
        border-radius: 20px
        height: 100%
        
        .el-divider
            margin-top: 0
        &__header
            width: 100%
            height: 100%
            display: flex
            align-items: center
            h4
                font-size: 24px
                margin-left: 25px
        .buttons
            width: 80%
            margin: 0 auto
            margin-bottom: 25px
        .el-button
            width: 100%
            margin-top: 25px
            margin-left: 0
        .drop-button
            border: none
    @media screen and (max-width: 1024px)
        .filters
            margin-left: 0
            margin-bottom: 50px
            &__header
                h4
                    font-size: 20px
                    margin-left: 25px
</style>