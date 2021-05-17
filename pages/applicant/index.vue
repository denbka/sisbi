<template>
    <div class="applicant">
        <div class="search-container">
            <search-component
            @confirm-params="onConfirmParams"
            :filters="filters"
            :role="role">
            </search-component>
        </div>
        <section class="vacancies">
            <div class="wrapper">
                <Sorts
                :stats="vacancies"
                :role="role"
                @on-sort="sort_by => $emit('confirm-params', { sort_by })">
                </Sorts>
                <div class="wrapper-block">
                    <component-list
                    :onResponse="onResponse"
                    class="list"
                    :data="vacancies">
                    </component-list>
                    <Filters
                    @confirm-params="isDrop => $emit('confirm-params', isDrop)"
                    :filters="filters"
                    :cities="cities.data">
                    </Filters>
                </div>
            </div>
        </section>
    </div>
</template>

<router>
    meta:
        name: 'Поиск вакансий'
</router>

<script>
import SearchComponent from '@/components/SearchComponent'
import ComponentList from '@/components/ComponentList'
import Filters from '@/components/Filters'
import Sorts from '@/components/Sorts'
import { mapState } from 'vuex'
export default {
    components: {
        SearchComponent,
        ComponentList,
        Sorts
    },
    data: () => ({
        filters: {
            salary: [0, 0],
            work_exp: [0, 0],
            cities: [],
            position: '',
        }
    }),
    computed: {
        ...mapState(['vacancies', 'role', 'cities'])
    },
    methods: {
        async onConfirmParams(isDrop) {
            if (isDrop) {
                this.filters = {
                    salary: [0, 0],
                    work_exp: [0, 0],
                    cities: []
                }
            }
            const params = {
                position: this.filters.position,
                cities: this.filters.cities,
                min_salary: this.filters.salary[0] ? this.filters.salary[0] : null,
                max_salary: this.filters.salary[1] ? this.filters.salary[1] : null,
                min_work_exp: this.filters.work_exp[0] ? this.filters.work_exp[0] : null,
                max_work_exp: this.filters.work_exp[1] ? this.filters.work_exp[1] : null,
            }
            await this.$store.dispatch('getEntities', {
                entityName: 'vacancies',
                params
            })
        },
        onResponse(item) {
            this.$store.commit('SET_ITEMS', {
                entityName: 'tempForm',
                response: JSON.parse(JSON.stringify(item))
            })
            this.$modal.show('ResponseModal')
        }
    },
    async asyncData({ store, $axios }) {
        await store.dispatch('getEntities', {
            entityName: 'vacancies',
            $axios
        })
        await store.dispatch('getEntities', {
            entityName: 'cities',
            $axios
        })
    }
}
</script>

<style lang="sass" scoped>
    .search-container
        margin: 150px 0 200px 0
    .vacancies
        .wrapper
            .list
                flex: 0.8
        .wrapper
            flex-direction: column
            &-block
                display: flex
                width: 100%
                .list
                    flex: 0.8
    
    @media screen and (max-width: 1024px)
        .search-container
            margin: 100px 0
        .vacancies .wrapper-block
            display: flex
            flex-direction: column
            .list
                order: 1
            &__filters
                order: 0
</style>