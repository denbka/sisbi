<template>
    <page-landing
    v-if="!user"
    @confirm-params="onConfirmParams"
    :filters="filters"
    :cities="cities.data"
    :resumes="resumes"
    :role="tempRole">
    </page-landing>
    <page-resumes
    v-else
    @confirm-params="onConfirmParams"
    :filters="filters"
    :cities="cities.data"
    :resumes="resumesWithResponses"
    :role="role"
    :onResponse="onResponse"
    :onConfirmParams="onConfirmParams">
    </page-resumes>
</template>

<router>
    meta:
        name: 'Главная'
</router>

<script>
import PageLanding from '@/components/employer/PageLanding'
import PageResumes from '@/components/employer/PageResumes'
import { mapState, mapGetters } from 'vuex'
export default {
    components: {
        PageLanding,
        PageResumes
    },
    computed: {
        ...mapState(['user', 'resumes', 'cities', 'role', 'tempRole', 'limitPagination']),
        ...mapGetters(['resumesWithResponses'])
    },
    mounted() {
        console.log(this.resumesWithResponses)
    },
    data: () => ({
        filters: {
            salary: [0, 0],
            work_exp: [0, 0],
            cities: [],
            position: '',
        },
        sort: 'date_desc',
        choicedItemId: null
    }),
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
                entityName: 'resumes',
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
            // store.commit('SET_ITEMS', {
            //     entityName: 'view',
            //     response: 'grid'
            // })
        }
        try {
            await store.dispatch('getEntities', {
                entityName: 'resumes',
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
        
    },
}
</script>