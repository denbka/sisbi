<template>
    <div class="applicant">
        <div class="search-container">
            <search-component
            @confirm-params="onConfirmParams({})"
            :filters="filters"
            :role="role">
            </search-component>
        </div>
        <section class="vacancies">
            <div class="wrapper">
                <Sorts
                :stats="vacancies"
                :role="role"
                @on-sort="sort_by => onConfirmParams({ sort_by })">
                </Sorts>
                <div class="wrapper-block">
                    <component-list
                    @confirm-params="currentPage => onConfirmParams({ currentPage })"
                    :onResponse="onResponse"
                    class="list"
                    :data="vacancies"
                    :onConfirmParams="onConfirmParams">
                    </component-list>
                    <Filters
                    @confirm-params="isDrop => onConfirmParams({ isDrop })"
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
import { mapState, mapGetters } from 'vuex'
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
        },
        choicedItemId: null
    }),
    computed: {
        ...mapState(['vacancies', 'role', 'cities', 'limitPagination']),
        ...mapGetters(['vacanciesWithResponses'])
    },
    methods: {
        async onConfirmParams(props) {
            if (props?.sort_by) this.sort = props.sort_by
            if (props?.isDrop) {
                this.filters = {
                    salary: [0, 0],
                    work_exp: [0, 0],
                    cities: [],
                    position: ''
                }
            }
            const params = {
                position: this.filters.position,
                cities: this.filters.cities,
                min_salary: this.filters.salary[0] ? this.filters.salary[0] : null,
                max_salary: this.filters.salary[1] ? this.filters.salary[1] : null,
                min_work_exp: this.filters.work_exp[0] ? this.filters.work_exp[0] : null,
                max_work_exp: this.filters.work_exp[1] ? this.filters.work_exp[1] : null,
                sort_by: this.sort,
                page: props?.currentPage ? props.currentPage : 1,
                limit: this.limitPagination,
            }
            await this.$store.dispatch('getEntities', {
                entityName: 'vacancies',
                params
            })
        },
        async onResponse(item, itemsWithoutResponse) { 
            if (itemsWithoutResponse.length === 1) {
                this.choicedItemId = itemsWithoutResponse[0].id
                await this.onRequestResponse(item)
            } else {
                this.$store.commit('SET_ITEMS', {
                    entityName: 'tempForm',
                    response: JSON.parse(JSON.stringify({...item, itemsWithoutResponse }))
                })
                this.$modal.show('ResponseModal')
            }
        },
        async onRequestResponse(item) {
            // this.disabled = true
            const data = {
                resume_id: this.role === 'employer' ? item.id : this.choicedItemId,
                vacancy_id: this.role === 'employer' ? this.choicedItemId : item.id,
            }
            try {
                await this.$store.dispatch('saveEntity', {
                    entityName: 'responses',
                    data,
                    method: 'post',
                    inStore: false
                })
                await this.onConfirmParams()
                this.$forceUpdate()
            } catch(e) {
                console.log('Такой отклик уже существует')
            } finally {
                // this.disabled = false
            }
        }
    },
    async asyncData({ store, $axios }) {
        if (!store.state.user) {
            store.commit('SET_ITEMS', {
                entityName: 'limitPagination',
                response: 4
            })
        }
        try {
            await store.dispatch('getEntities', {
                entityName: 'vacancies',
                $axios,
                params: {
                    limit: store.state.limitPagination,
                    page: 1,
                    sort_by: 'date_desc'
                }
            })
            await store.dispatch('getEntities', {
                entityName: 'cities',
                $axios
            })
            if (!store.state.user) return
            const entity = store.state.role === 'employer' ? 'vacancies' : 'resumes'

            await store.dispatch('getEntities', {
                entityName: 'profile/responses',
                stateName: 'responses',
                $axios,
            })
            const response = await store.dispatch('getEntities', {
                entityName: `profile/${entity}`,
                stateName: entity
            })
            const items = response.data
            return {
                items,
                entity
            }
        } catch(e) {
            console.log(e)
        }
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